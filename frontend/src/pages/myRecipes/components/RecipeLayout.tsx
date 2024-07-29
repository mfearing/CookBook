import { Grid } from "@mui/material";
import RecipeNav from "./RecipeNav";


export default function RecipeLayout(){
    return(
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <RecipeNav />
            </Grid>
            <Grid item xs={10}>
                xs=8
            </Grid>
        </Grid>
    )
}