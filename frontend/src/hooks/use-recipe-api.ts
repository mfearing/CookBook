import { useMemo } from "react";
import axios from "axios";
import useAuthContext from "./use-auth-context";

export default function useRecipeApi() {
    const authContext = useAuthContext();

    const api = useMemo(() => { //useMemo will memoize all method calls
        const instance = axios.create({
            baseURL: 'http://localhost:8282'
        });

        instance.interceptors.request.use((config) => {
            if(authContext?.userLogin?.token){
                config.headers['Authorization'] = `Bearer ${authContext.userLogin.token}`;
            }
            return config;
        });

        instance.interceptors.response.use((response) => {
            if(response.status === 401){ //user unauthorized because of bad token
                authContext?.logUserOut();
            }
            return response;
        });

        return instance;
    }, [authContext]);

    return api;

}