import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { RecipeNavProps } from "./RecipeLayout";

export default function RecipeNav({updateNav, navSetting}: RecipeNavProps){

    return (
        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {updateNav("recipe")}} selected={navSetting === 'recipe'} >
                        <ListItemText primary="Recipes" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {updateNav("ingredient")}} selected={navSetting === 'ingredient'} >
                        <ListItemText primary="Ingredients" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {updateNav("unit")}} selected={navSetting === 'unit'}>
                        <ListItemText primary="Units" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

}