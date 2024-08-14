import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import type RecipeDetails from "../../../types/recipe/recipeDetails";

export interface RecipeDropdownDetails{
    id: number,
    name: string,
}

export interface RecipeDropdownProps {
    data: RecipeDetails[] | null,
    selectedRecipe: number | null,
    handleClick: (recipe: RecipeDetails) => void
}

export default function RecipeDropdown({data, selectedRecipe, handleClick}: RecipeDropdownProps){

    const recipeMenuItems = data?.map((element: RecipeDetails) => {
        return <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>;
    });

    const handleOnChange = (event: SelectChangeEvent) => {
        const id = JSON.parse(event.target.value) as number;
        const selected = data?.find((recipe) => {
            return recipe.id === id;
        });

        if(selected){
            handleClick(selected);
        }
    }

    return (
        <Box sx={{ my: 1, width: {xs: '100%', sm: '50%'} }} >
            <FormControl fullWidth>
                <InputLabel id="recipe-select-label">Select Recipe</InputLabel>
                <Select
                    labelId="recipe-select"
                    label="Select Recipe"
                    value={selectedRecipe ? JSON.stringify(selectedRecipe) : ''} //materialUI doesn't seem to like numbers, so convert to string
                    onChange={handleOnChange}
                >
                    {recipeMenuItems}
                </Select>
            </FormControl>
        </Box>
    )
}