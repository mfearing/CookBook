import { useEffect } from "react";
import useRecipeContext from "../../../hooks/use-recipe-context"
import { RecipeContextType } from "../../../context/recipe";
import RecipeDetails from "../../../types/recipe/recipeDetails";
import RecipeDropdown from "./RecipeDropdown";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable, { DataGridRow } from "./DataTable";
import DescriptionCard from "./DescriptionCard";
// import InstructionsCard from "./InstructionsCard";


export default function RecipeDataTable(){
    const {recipe, recipeSummaries, fetchRecipeById, fetchSummaryRecipes} = useRecipeContext() as RecipeContextType;

    useEffect(() => {
        fetchSummaryRecipes(); 
    }, [fetchSummaryRecipes]);

    const handleSelectRecipe = (recipe: RecipeDetails) => {
        if(recipe.id){
            fetchRecipeById(recipe.id);
        }
    };

    
    let typeScriptIsStupid; //I don't know why I can't just use recipe ? recipe.id : null
    if(recipe !== null && recipe !== undefined && recipe.id){
        typeScriptIsStupid = recipe.id;
    } else {
        typeScriptIsStupid = null;
    }
    
    const recipeDropdown = <RecipeDropdown data={recipeSummaries} selectedRecipe={typeScriptIsStupid} handleClick={handleSelectRecipe} />;

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0, type: 'number', sortable: true},
        {field: 'ingredient', headerName: 'Ingredient', flex: 3, type: 'string', sortable: true},
        {field: 'quantity', headerName: 'Quantity', flex: 1, type: 'string', sortable: true},
        {field: 'unit', headerName: 'Unit', flex: 1, type: 'string', sortable: true},
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
    if(recipe && recipe.recipeIngredients.length > 0){
        recipeDataTable = (
            <>
                <DataTable rows={rows} columns={columns} handleRefresh={() => {}} />
                <br /><br />
                {/* <AddRowForm handleSubmit={() =>{}} label={label} /> */}
            </>
        );
    }
    
    return(
        <div>
            {recipeDropdown}
            <Stack spacing={2} useFlexGap sx={{ width: {xs: '100%', sm: '100%'} }}>
                { recipe ? <DescriptionCard name={recipe.name} author={recipe.author} description={recipe.description} instructions={recipe.instructions} /> : <></> }
                {recipeDataTable}
            </Stack>
        </div>
    )
}