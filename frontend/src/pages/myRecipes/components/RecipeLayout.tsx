import { Grid } from "@mui/material";
import RecipeNav from "./RecipeNav";
import { useState } from "react";
import DataTableLayout from "./DataTableLayout";

export interface RecipeNavProps {
    updateNav: (navSetting: string) => void,
    navSetting: string
}

export interface DataTableLayoutProps {
    type: string
}

export default function RecipeLayout(){
    const [nav, setNav] = useState("");
    const handleNavChange = (navSetting: string) => {
        setNav(navSetting);
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <RecipeNav updateNav={handleNavChange} navSetting={nav}  />
            </Grid>
            <Grid item xs={10}>
            <DataTableLayout type={nav} />
            </Grid>
        </Grid>
    )
}