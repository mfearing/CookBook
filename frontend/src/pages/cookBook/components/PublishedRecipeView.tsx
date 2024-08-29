import { Grid } from "@mui/material";
import RecipeDetails from "../../../types/recipe/recipeDetails";


export interface PublishedRecipeProps{
    recipe: RecipeDetails
}

export default function PublishedRecipeView({recipe}: PublishedRecipeProps) {


    return (
        <Grid>
            <Grid item xs={4}>
                {recipe.name}
            </Grid>
            <Grid item xs={8}>
                {recipe.description}
                <br />
                {recipe.instructions}
            </Grid>
        </Grid>
    );
}