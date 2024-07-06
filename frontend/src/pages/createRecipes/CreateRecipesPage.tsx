import { AuthContextType } from "../../context/auth";
import useAuthContext from "../../hooks/use-auth-context";

export default function CreateRecipesPage(){
    const {userLogin} = useAuthContext() as AuthContextType;

    let content;
    if(userLogin && userLogin?.token !== null){
        content = <div>Welcome to the Create Recipes Page, {userLogin.firstName}!</div>; 
    } else {
        content = <div>Please login to view this content!</div>; //TODO: This should be an entire home page for people that aren't logged in
    }

    return(
        <div>{content}</div>
    );

}