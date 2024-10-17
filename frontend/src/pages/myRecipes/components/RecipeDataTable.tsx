import { useEffect } from "react";
import useRecipeContext from "../../../hooks/use-recipe-context"
import { RecipeContextType } from "../../../context/recipe";
import RecipeDetails from "../../../types/recipe/recipeDetails";
import RecipeDropdown from "./RecipeDropdown";
import { Box, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable, { DataGridRow } from "../../../component/DataTable";
import DescriptionCard from "./DescriptionCard";
import AddRecipeIngredientRowForm from "./AddRecipeIngredientRowForm";
import { Delete, Add, MenuBook } from "@mui/icons-material";

export default function RecipeDataTable(){
    const {recipe, recipeSummaries, fetchRecipeById, 
        fetchSummaryRecipes, patchRecipe, createNewRecipe, deleteRecipe, deleteRecipeIngredient, 
        createRecipeIngredient, publishRecipe} = useRecipeContext() as RecipeContextType;

    useEffect(() => {
        fetchSummaryRecipes(); 
    }, [fetchSummaryRecipes]);

    const handleSelectRecipe = (r: RecipeDetails) => {
        if(r.id){
            fetchRecipeById(r.id);
        }
    };

    const handleRecipeDelete = () => {
        if(recipe && recipe.id){
            const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
            if(confirmDelete){
                deleteRecipe(recipe.id);
            }
        }
    }

    const handlePublishRecipe = () => {
        if(recipe && recipe.id){
            const confirmPublish = window.confirm("Would you like to publish this recipe to the CookBook?");
            if(confirmPublish){
                publishRecipe(recipe.id);
            }
        }
    }

    const handleRecipePatch = (name: string, description: string, instructions: string) => {
        if(recipe){
            patchRecipe(name, description, instructions);
        }
    };

    const handleRecipeIngredientRefresh = () => {
        if(recipe !== null && recipe !== undefined && recipe.id){
            fetchRecipeById(recipe.id);
        }
    };

    const handleRecipeIngredientDelete = (recipeId: number | undefined, recipeIngredientId: number) => {
        if(recipeId !== undefined){
            deleteRecipeIngredient(recipeId, recipeIngredientId);
        }
    };

    const handleRecipeIngredientCreate = (ingredientId: number, unitId: number, quantity: number) => {
        if(recipe !== null && recipe !== undefined && recipe.id){
            createRecipeIngredient(recipe?.id, ingredientId, unitId, quantity);
        }
    }
    
    let rId; //I don't know why I can't just use recipe ? recipe.id : null
    if(recipe !== null && recipe !== undefined && recipe.id){
        rId = recipe.id;
    } else {
        rId = null;
    }
    
    const recipeDropdown = (
        <Box sx={{display: 'flex', alignItems: 'center',}} >
            <Box sx={{flex: 1}} >
                <RecipeDropdown data={recipeSummaries} selectedRecipe={rId} handleClick={handleSelectRecipe} />
            </Box>
            <Box sx={{flex: 1}}>
                <Tooltip title="Add Recipe">
                    <IconButton onClick={() => createNewRecipe()} color='primary' >
                        <Add />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Publish to CookBook">
                    <span>
                    <IconButton onClick={handlePublishRecipe} color='primary' disabled={!recipe} >
                        <MenuBook />
                    </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Delete Recipe">
                    <span>
                    <IconButton onClick={handleRecipeDelete} color='warning' disabled={!recipe} >
                        <Delete />
                    </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </Box>
    );

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0, type: 'number', sortable: true},
        {field: 'ingredient', headerName: 'Ingredient', flex: 3, type: 'string', sortable: true},
        {field: 'quantity', headerName: 'Quantity', flex: 1, type: 'string', sortable: true},
        {field: 'unit', headerName: 'Unit', flex: 1, type: 'string', sortable: true},
        {
            field: 'delete',
            headerName: ' ',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Grid container justifyContent="flex-end">
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleRecipeIngredientDelete(recipe?.id, params.id as number)}  >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Grid>
            )
        }
    ];

    let rows: DataGridRow[] = [];
    if(recipe && recipe.recipeIngredients !== null){
         rows = recipe.recipeIngredients.map((recIng) => {
            return {
                id: recIng.id,
                ingredient: recIng.ingredient.name, 
                unit: recIng.unit.name, 
                quantity: recIng.quantity
            };
        });
    } 
    
    let recipeDataTable = <></>
    if(recipe){
        recipeDataTable = (
            <>
                <DataTable label="Recipe Ingredients" rows={rows} columns={columns} handleRefresh={handleRecipeIngredientRefresh} />
                <br /><br />
                <AddRecipeIngredientRowForm handleRecipeIngredientCreate={handleRecipeIngredientCreate} />
            </>
        );
    }
    
    return(
        <>
            {recipeDropdown}
            <Stack spacing={2} useFlexGap sx={{ width: {xs: '100%', sm: '100%'} }}>
                { recipe ? 
                    <DescriptionCard 
                        name={recipe.name} 
                        author={recipe.author} 
                        description={recipe.description} 
                        instructions={recipe.instructions}
                        handleRecipePatch={handleRecipePatch}    
                    /> : <></> }
                {recipeDataTable}
            </Stack>
        </>
    )
}