// import {prisma} from "../db"
import { generateAccessToken ,generateRefreshToken } from "@/utils/jwt"
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
export const AuthService={
    async signup(email:string , passsword:string ,name?:string){
        const hashedPassword = await bcrypt.hash(passsword ,12)
        return db.user.create({
            data:{
                email,
                password:hashedPassword,
                name
            },
            select:{
                id:true,
                email:true,
                name:true,
            }
        })
    },
    async login (email:string ,password:string){
        // the first step is to find the user by email
        const user = await db.user.findUnique({where:{email}})
        if(!user) throw new Error("User not found")
        // the nest step is to compare the password with the hashed password 
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) throw new Error("Invalid password")
        // if the password is valid we generate the access token and refresh token
        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)
        // we return the user data and the tokens 
        await db.refreshToken.create({
            data:{
                token :refreshToken,
                userId:user.id,
                expiresAt:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //7day
            }
        })
        return {
            user:{id:user.id , email:user.email ,name:user.name},
            accessToken,
            refreshToken
        }
    },
    async refreshToken (refreshToken :string){
        const storedToken =await db.refreshToken.findUnique({
            where:{
                token:refreshToken
            },
            include:{
                user:true
            }
        }) 
        if(!storedToken || storedToken.expiresAt < new Date()){
            throw new Error("Invalid or expired refresh token ")
        }
        const newAccessToken = generateAccessToken(storedToken.userId)
        return {accessToken :newAccessToken}
    },
    async logout (refreshToken:string){
        await db.refreshToken.delete({
            where:{
                token:refreshToken
            }
        })
    }
}
