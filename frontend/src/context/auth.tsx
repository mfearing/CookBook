import { createContext, useState, ReactNode } from "react";
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

    const getAuthByLogin = async (loginDetails: LoginDetails): Promise<UserDetails | void> => {
        try{
            const response = await axios.post("http://localhost:8181/login", loginDetails);
            setUserLogin(response.data);
        } catch (error){
            console.error("Failed to authenticate");
        }
    };

    const registerNewLogin = async (signUpDetails: SignUpDetails): Promise<UserDetails | void> => {
        try{
            const response = await axios.post("http://localhost:8181/register", signUpDetails);
            setUserLogin(response.data);
        } catch(error){
            console.error("Failed to authenticate");
        }
    };

    const patchUserLogin = async(data: UserDetails): Promise<UserDetails | void> => {
        try{
            const response = await axios.patch(`http://localhost:8181/user/${data.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${userLogin?.token}`
                }
            });
            setUserLogin({
                ...response.data,
                token: userLogin?.token
            });
        } catch(error){
            console.error(error);
        }
    }

    const logUserOut = () => {
        setUserLogin(null);
    };

    return (
        <AuthContext.Provider value={{userLogin, getAuthByLogin, registerNewLogin, patchUserLogin, logUserOut}}>
            {children}
        </AuthContext.Provider>
    );

}

export {AuthProvider, AuthContext};