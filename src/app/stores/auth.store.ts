import {create} from 'zustand';
import {persist} from "zustand/middleware";
import {trpc} from '../../server/api/trpc';

// Define the shape of the AuthStore
interface AuthState{
    user:{
        email:string;
        password:string;
        name?:string;
    }|null;
    accessToken:string|null;
    refreshToken:string|null;
    isloading:boolean;
    error:string|null;
    logIn :(email:string,password:string)=>Promise<void>;
    signUp :(email:string,password:string,name?:string)=>Promise<void>;
    logOut:()=>Promise<void>;
    refreshTokenMethode:()=>Promise<void>;
}
// Create the AuthStore using Zustand with persistence
export const useAuthStore = create<AuthState>()(
    persist((set,get)=>({
        // Initial state
        user:null,
        accessToken:null,
        refreshToken:null,
        isloading:false,
        error:null,
        // Method to log in
        LogIn:async(email:string,password:string)=>{
            set({isloading:true,error:null});
            try {
                const response = await trpc.auth.LogIn.mutate({email,password});
            } catch (error) {
                
            }
        }
    }))
)