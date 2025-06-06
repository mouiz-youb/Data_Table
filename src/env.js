// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables
   */
  server: {
    DATABASE_URL: z.string().url().min(1),
    
    // Authentication
    ACCESS_TOKEN_SECRET: z.string().min(32),
    REFRESH_TOKEN_SECRET: z.string().min(32),
    ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"), // 15 minutes
    REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),  // 7 days
    
    // Security
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    RATE_LIMIT_PER_MINUTE: z.coerce.number().default(60),
    
    // Email (if using email verification/password reset)
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
  },

  /**
   * Client-side environment variables
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_ENABLE_DEBUG: z.coerce.boolean().default(false),
  },

  /**
   * Runtime environment variables
   */
  runtimeEnv: {
    // Server-side
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV,
    RATE_LIMIT_PER_MINUTE: process.env.RATE_LIMIT_PER_MINUTE,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    
    // Client-side
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG,
  },

  /**
   * Validation options
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,

  /**
   * Custom error handling
   */
  // onValidationError: (error) => {
  //   console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
  //   throw new Error("Invalid environment variables");
  // },

  /**
   * Custom transformation
   */
  // onInvalidAccess: (variable) => {
  //   throw new Error(`❌ Attempted to access server-side variable "${variable}" on client`);
  // },
});