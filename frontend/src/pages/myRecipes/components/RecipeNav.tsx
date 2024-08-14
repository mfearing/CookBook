import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { RecipeNavProps } from "./RecipeLayout";

export default function RecipeNav({updateNav, navSetting}: RecipeNavProps){

    const navValues= [
        {key: 'recipe', label: 'Recipe'}, 
        {key: 'ingredient', label: 'Ingredient'}, 
        {key: 'unit', label: 'Unit'}
    ];

    const listItems = navValues.map(value => {
        return (
            <ListItem disablePadding key={value.key}>
                    <ListItemButton 
                        onClick={() => {updateNav(value.key)}} 
                        selected={navSetting === value.key} 
                    >
                        <ListItemText primary={value.label} />
                    </ListItemButton>
            </ListItem>
        );
    });

    return (
        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
            <List>
                {listItems}
            </List>
        </Box>
    );

}