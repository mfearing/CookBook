import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function useAuthContext(){
    return useContext(AuthContext);
}