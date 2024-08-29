import { useMemo } from "react";
import axios from "axios";

export default function useCookBookApi() {

    const api = useMemo(() => { //useMemo will memoize all method calls
        const instance = axios.create({
            baseURL: 'http://localhost:8383'
        });

        return instance;
    }, []);

    return api;
}