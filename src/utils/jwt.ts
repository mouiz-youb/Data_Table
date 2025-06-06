import jwt from 'jsonwebtoken';
import {env} from  "../env.js";
const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const  REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;
// generate access token 
export const generateAccessToken = (userId: string)=> {
return jwt.sign(
    {userId} , 
    ACCESS_TOKEN_SECRET, 
    {expiresIn: '15m',})
}
export const generateRefreshToken = (userId: string)=> {
return jwt.sign(
    {userId} , 
    ACCESS_TOKEN_SECRET, 
    {expiresIn: '7d',})
}
// Verify  tokens
export const verifyAccessToken=(token:string)=>{
    return jwt.verify(token,ACCESS_TOKEN_SECRET) as {userId :string}
}
export const verifyRefreshToken=(token:string)=>{
    return jwt.verify(token , REFRESH_TOKEN_SECRET) as {userId :string}
}