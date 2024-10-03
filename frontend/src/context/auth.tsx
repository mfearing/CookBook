import { createContext, useState, ReactNode, useMemo } from "react";
import type LoginDetails from "../types/login/loginDetails";
import type UserDetails from "../types/login/userDetails";
import SignUpDetails from "../types/login/signUpDetails";
import axios from "axios";

export interface AuthContextType {
    userLogin: UserDetails | null;
    getAuthByLogin: (login: LoginDetails) => Promise<UserDetails | void>;
    registerNewLogin: (signUpDetails: SignUpDetails) => Promise<UserDetails | void>;
    patchUserLogin: (data: UserDetails) => Promise<UserDetails | void>;
    logUserOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

//Use this provider to handle authentication to the application and pass that auth down to components
function AuthProvider({children}: {children: ReactNode}) {
    const [userLogin, setUserLogin] = useState<null | UserDetails>(null);

    //api - couldn't separate this out without circular dependency?
    const api = useMemo(() => { //useMemo will memoize all method calls
        const instance = axios.create({
            baseURL: 'http://localhost:8081/v1/auth'
        });
    
        instance.interceptors.request.use((config) => {
            if(userLogin?.token){
                config.headers['Authorization'] = `Bearer ${userLogin?.token}`;
            }
            return config;
        });
    
        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if(error.response && error.response.status === 401){
                    alert("Your user session has expired, please log in.");
                    logUserOut();
                }
                return Promise.reject(error);
            }
    
        );
    
        return instance;
    }, [userLogin]);
    

    const getAuthByLogin = async (loginDetails: LoginDetails): Promise<UserDetails | void> => {
        try{
            const response = await api.post("/login", loginDetails);
            setUserLogin(response.data);
        } catch (error){
            console.error("Failed to authenticate");
        }
    };

    const registerNewLogin = async (signUpDetails: SignUpDetails): Promise<UserDetails | void> => {
        try{
            const response = await api.post("/register", signUpDetails);
            setUserLogin(response.data);
        } catch(error){
            console.error("Failed to authenticate");
        }
    };

    const patchUserLogin = async(data: UserDetails): Promise<UserDetails | void> => {
        try{
            const response = await api.patch(`/user/${data.id}`, data);
            setUserLogin({
                ...response.data,
                token: userLogin?.token
            });
        } catch(error){
            console.error(error);
        }
    }

    const logUserOut = async() => {
        await api.post(`/logout`);
        setUserLogin(null);
    };

    return (
        <AuthContext.Provider value={{userLogin, getAuthByLogin, registerNewLogin, patchUserLogin, logUserOut}}>
            {children}
        </AuthContext.Provider>
    );

}

export {AuthProvider, AuthContext};