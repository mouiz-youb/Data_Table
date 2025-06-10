import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { type NextRequest } from 'next/server'
import { db } from "@/server/db";
import { verifyAccessToken } from "@/utils/jwt";

/**
 * 1. CONTEXT
 * Creates the base context with DB access and headers
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 * Sets up tRPC with superjson transformer and Zod error formatting
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

/**
 * 3. MIDDLEWARE & PROCEDURES
 */

// Performance logging middleware
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  
  if (t._config.isDev) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 100));
  }

  const result = await next();
  console.log(`[TRPC] ${path} took ${Date.now() - start}ms`);
  return result;
});

// Auth middleware setup
const isAuthed = t.middleware(async ({ ctx, next }) => {
  const token = ctx.headers?.get('authorization')?.split(' ')[1];
  if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

  try {
    const { userId } = verifyAccessToken(token);
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    
    return next({ ctx: { ...ctx, user } });
  } catch {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});

/**
 * PROCEDURES
 */
export const publicProcedure = t.procedure.use(timingMiddleware);
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(isAuthed);