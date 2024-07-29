import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function RecipeNav(){
    return (
        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Recipes" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Ingredients" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Units" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}