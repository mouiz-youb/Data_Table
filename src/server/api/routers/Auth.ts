import {z} from 'zod';
import {createTRPCRouter, publicProcedure} from '../trpc';
import { AuthService } from '@/server/services/authservice';
import { TRPCError } from '@trpc/server';

// create the router of teh auth 
export const AuthRouter = createTRPCRouter({
    //the signup procedure
    signup :publicProcedure
    .input(z.object({
        email:z.string().email(),
        password:z.string().min(6, 'Password must be at least 6 characters long'),
        name: z.string().min(1, 'Name is required'),
    }))
    .mutation(async({input})=>{ 
        const {email,password ,name}= input;
        try {
            return await AuthService.signup(email, password, name);
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An error occurred during signup',
            });
        }
    }),
    // the login procedure
    LogIn:publicProcedure
    .input(z.object({
        email:z.string().email(),
        password:z.string().min(6, 'Password must be at least 6 characters long'),
    }))
    .mutation(async({input})=>{
        const {email,password}= input 
        try {
            return await AuthService.login(email,password)
        } catch (error) {
            throw new TRPCError({
                code:"UNAUTHORIZED",
                message: 'Invalid email or password',
            })
        }
    }),
    // refresh token procedure
    refreshToken : publicProcedure
    .input(z.object({
        refreshToken: z.string(),
    }))
    .mutation(async({input})=>{
        const {refreshToken}= input;
        try {
            return await AuthService.refreshToken(refreshToken);
        } catch (error) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid or expired refresh token',
            })
        }
    }),
    // logout procedure 
    logout: publicProcedure
    .input(z.object({refreshToken: z.string()}))
    .mutation(async({input})=>{
        await AuthService.logout(input.refreshToken);
        return { message: 'Logged out successfully' };
    })
})