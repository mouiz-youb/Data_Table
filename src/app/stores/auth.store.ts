import {create} from 'zustand';
import {persist} from "zustand/middleware";
import {trpc} from "@/app/utils/trpc";
import { verifyRefreshToken } from '../../utils/jwt';
// Define the shape of the AuthStore
interface AuthState{
    user:{
        email:string;
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
    persist(
        (set,get)=>({
            // initial state
            user: null,
            accessToken: null,
            refreshToken: null,
            isloading: false,
            error: null,
            // method to log in
            logIn  :async (email:string,password:string)=>{
                set({isloading:true,error:null});
                try {
                    const response = await trpc.Auth.LogIn.useMutation().mutateAsync({email,password});
                    set({
                        user:{email},
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken,
                        isloading: false,
                        error: null,
                    })
                } catch (error) {
                    set({
                        isloading:false,
                        error: error instanceof Error ? error.message : 'An error occurred during login',
                    })
                }
            },
            // method to sign up
            signUp :async (email:string,password:string,name?:string)=>{
                set({isloading:true ,error:null});
                try {
                    await trpc.Auth.signup.useMutation().mutateAsync({email, password, name: name ?? ''});
                    await get().logIn(email,password);
                } catch (error) {
                    set({
                        isloading:false,
                        error: error instanceof Error ? error.message : 'An error occurred during signup',
                    })
                }
            },
            // method to log out
            logOut:async()=>{
                const {refreshToken}= get()
                if(refreshToken){
                    try {
                        await trpc.Auth.logout.useMutation().mutateAsync({refreshToken})
                    } catch (error) {
                        console.log(`Logout error ${error}`)
                    }
                }
               set({
                user:null,
                accessToken:null,
                refreshToken:null,
                isloading:false,
                error:null
               })
            },
            // refresh token methode 
            refreshTokenMethode:async ()=>{
                const {refreshToken}= get()
                if(!refreshToken) return
                set({isloading:true})
                try {
                    const {accessToken} = await trpc.Auth.refreshToken.useMutation().mutateAsync({refreshToken})
                    set({accessToken ,isloading:false})
                } catch (error) {
                    get().logOut()
                }
            },
            
        }),
        // create the storing
        {
            name:"auth_storing",
            partialize:(state)=>({
                user:state.user,
                accessToken:state.accessToken,
                refreshToken:state.refreshToken
            })
        }
        
    )) 