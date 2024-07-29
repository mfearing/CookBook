import { AuthContextType } from "../../context/auth";
import { IngredientProvider } from "../../context/ingredient";
import useAuthContext from "../../hooks/use-auth-context";
import MyRecipesSplashScreen from "./MyRecipesSplashScreen";
import RecipeLayout from "./components/RecipeLayout";

export default function MyRecipesPage(){
    const {userLogin} = useAuthContext() as AuthContextType;

    let content;
    if(userLogin && userLogin?.token !== null){
        content = <RecipeLayout />; 
    } else {
        content = <MyRecipesSplashScreen />; //user not logged in, show splash screen
    }

    return(
        <IngredientProvider>
            {content}
        </IngredientProvider>
    );

}