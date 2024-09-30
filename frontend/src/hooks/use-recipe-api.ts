import { useMemo } from "react";
import axios from "axios";
import useAuthContext from "./use-auth-context";

export default function useRecipeApi() {
    const authContext = useAuthContext();

    const api = useMemo(() => { //useMemo will memoize all method calls
        const instance = axios.create({
            baseURL: 'http://localhost:8081/v1/rcp'
        });

        instance.interceptors.request.use((config) => {
            if(authContext?.userLogin?.token){
                config.headers['Authorization'] = `Bearer ${authContext.userLogin.token}`;
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
                    authContext?.logUserOut();
                }
                return Promise.reject(error);
            }
    
        );

        return instance;
    }, [authContext]);

    return api;

}