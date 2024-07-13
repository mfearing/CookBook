import { AuthContextType } from "../../context/auth";
import useAuthContext from "../../hooks/use-auth-context";
import MyRecipesSplashScreen from "./MyRecipesSplashScreen";

export default function MyRecipesPage(){
    const {userLogin} = useAuthContext() as AuthContextType;

    let content;
    if(userLogin && userLogin?.token !== null){
        content = <div><h3>Welcome to the My Recipes Page, {userLogin.firstName}!</h3></div>; 
    } else {
        content = <MyRecipesSplashScreen />; //user not logged in, show splash screen
    }

    return(
        <div>{content}</div>
    );

}