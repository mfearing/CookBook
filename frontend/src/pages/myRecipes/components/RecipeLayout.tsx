import { Grid } from "@mui/material";
import RecipeNav from "./RecipeNav";
import { useState } from "react";
import IngredientDataTable from "./IngredientDataTable";
import UnitDataTable from "./UnitDataTable";
import RecipeDataTable from "./RecipeDataTable";

export interface RecipeNavProps {
    updateNav: (navSetting: string) => void,
    navSetting: string
}

export default function RecipeLayout(){
    const [nav, setNav] = useState("");
    const handleNavChange = (navSetting: string) => {
        setNav(navSetting);
    }

    let content = <>{nav}</>;
    if(nav === 'ingredient'){
        content = <IngredientDataTable />;
    } else if (nav === 'unit'){
        content = <UnitDataTable />;
    } else if (nav === 'recipe'){
        content = <RecipeDataTable />;
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <RecipeNav updateNav={handleNavChange} navSetting={nav}  />
            </Grid>
            <Grid item xs={10}>
                {content}
            </Grid>
        </Grid>
    )
}