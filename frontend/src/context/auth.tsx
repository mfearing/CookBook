import { createContext, useState, ReactNode, useMemo } from "react";
import type LoginDetails from "../types/login/loginDetails";
import type UserDetails from "../types/login/userDetails";
import SignUpDetails from "../types/login/signUpDetails";
import axios from "axios";

export interface AuthContextType {
    userLogin: UserDetails | null;
    getAuthByLogin: (login: LoginDetails) => Promise<UserDetails | void>;
    getAuthByToken: (token: string) => Promise<UserDetails | void>;
    registerNewLogin: (signUpDetails: SignUpDetails) => Promise<UserDetails | void>;
    patchUserLogin: (data: UserDetails) => Promise<UserDetails | void>;
    logUserOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const baseURL = 'http://localhost:8081/v1/auth';

//Use this provider to handle authentication to the application and pass that auth down to components
function AuthProvider({children}: {children: ReactNode}) {
    const [userLogin, setUserLogin] = useState<UserDetails | null>(null);

    //api - couldn't separate this out without circular dependency (setUserLogin())?
    const api = useMemo(() => { //useMemo will memoize all method calls
        const instance = axios.create({
            baseURL
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
                    setUserLogin(null);
                }
                //return Promise.reject(error);
            }
        );
    
        return instance;
    }, [userLogin]);
    

    const getAuthByLogin = async (loginDetails: LoginDetails): Promise<UserDetails | void> => {
        try{
            const response = await api.post("/login", loginDetails);
            setUserLogin(response.data);
            sessionStorage.setItem('token', response.data.token);
        } catch (error){
            console.error("Failed to authenticate");
        }
    };

    const getAuthByToken = async (token: string): Promise<UserDetails | void> => {
        try{
            //token gotten from session storage, so not using api to set token header
            const response = await axios.get(`${baseURL}/token-login`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json'
                }
            });

            //make sure stored token gets added
            const details: UserDetails = {
                ...response.data,
                token: token
            }; 

            //set user details
            setUserLogin(details);

        } catch(error){
            // clear session storage and user details if token fails to log user in
            sessionStorage.removeItem('token');
            setUserLogin(null);
        }
    }

    const registerNewLogin = async (signUpDetails: SignUpDetails): Promise<UserDetails | void> => {
        try{
            const response = await api.post("/register", signUpDetails);
            setUserLogin(response.data);
            sessionStorage.setItem('token', response.data.token);
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
        sessionStorage.removeItem('token');
        setUserLogin(null);
    };

    return (
        <AuthContext.Provider value={{userLogin, getAuthByLogin, getAuthByToken, registerNewLogin, patchUserLogin, logUserOut}}>
            {children}
        </AuthContext.Provider>
    );

}

export {AuthProvider, AuthContext};