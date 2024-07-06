import { createContext, useState, ReactNode } from "react";
import type LoginDetails from "../types/loginDetails";
import type UserDetails from "../types/userDetails";
import SignUpDetails from "../types/signUpDetails";
import axios from "axios";

export interface AuthContextType {
    userLogin: UserDetails | null;
    getAuthByLogin: (login: LoginDetails) => Promise<UserDetails | void>;
    registerNewLogin: (signUpDetails: SignUpDetails) => Promise<UserDetails | void>;
    logUserOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

//Use this provider to handle authentication to the application and pass that auth down to components
function AuthProvider({children}: {children: ReactNode}) {
    const [userLogin, setUserLogin] = useState<null | UserDetails>(null);

    const getAuthByLogin = async (loginDetails: LoginDetails): Promise<UserDetails | void> => {
        try{
            const response = await axios.post("http://localhost:8080/login", loginDetails);
            setUserLogin(response.data);
        } catch (error){
            console.error("Failed to authenticate");
        }
    };

    const registerNewLogin = async (signUpDetails: SignUpDetails): Promise<UserDetails | void> => {
        try{
            const response = await axios.post("http://localhost:8080/register", signUpDetails);
            setUserLogin(response.data);
        } catch(error){
            console.error("Failed to authenticate");
        }
    }

    const logUserOut = () => {
        setUserLogin(null);
    }

    return (
        <AuthContext.Provider value={{userLogin, getAuthByLogin, registerNewLogin, logUserOut}}>
            {children}
        </AuthContext.Provider>
    );

}

export {AuthProvider, AuthContext};