import { useEffect, useState } from "react";
import useRecipeContext from "../../../hooks/use-recipe-context"
import { RecipeContextType } from "../../../context/recipe";
import RecipeDetails from "../../../types/recipe/recipeDetails";
import RecipeDropdown from "./RecipeDropdown";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable, { DataGridRow } from "./DataTable";
import DescriptionCard from "./DescriptionCard";
import InstructionsCard from "./InstructionsCard";


export default function RecipeDataTable(){
    const {recipes, fetchRecipes} = useRecipeContext() as RecipeContextType;
    const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);

    useEffect(() => {
        fetchRecipes(); 
    }, [fetchRecipes]);

    const handleSelectRecipe = (recipe: RecipeDetails) => {
        if(recipe.id){
            setSelectedRecipe(recipe.id);
        }
    };

    //const label="Recipe Ingredient";

    const recipeDropdown = <RecipeDropdown data={recipes} selectedRecipe={selectedRecipe} handleClick={handleSelectRecipe} />;

    const rec = recipes?.find((r) => r.id === selectedRecipe);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0, type: 'number', sortable: true},
        {field: 'ingredient', headerName: 'Ingredient', flex: 3, type: 'string', sortable: true},
        {field: 'quantity', headerName: 'Quantity', flex: 1, type: 'string', sortable: true},
        {field: 'unit', headerName: 'Unit', flex: 1, type: 'string', sortable: true},
    ];

    let rows: DataGridRow[] = [];
    if(rec !== undefined && rec.recipeIngredients !== null){
         rows = rec.recipeIngredients.map((recIng) => {
            return {
                id: recIng.id,
                ingredient: recIng.ingredient.name, 
                unit: recIng.unit.name, 
                quantity: recIng.quantity
            };
        });
    } 
    
    let recipeDataTable = <></>
    if(rec && rec.recipeIngredients.length > 0){
        recipeDataTable = (
            <>
                <DataTable rows={rows} columns={columns} handleRefresh={() => {}} />
                <br /><br />
                {/* <AddRowForm handleSubmit={() =>{}} label={label} /> */}
            </>
        )
    }
    
    return(
        <div>
            {recipeDropdown}
            <Stack spacing={2} useFlexGap sx={{ width: {xs: '100%', sm: '100%'} }}>
                { rec ? <DescriptionCard name={rec.name} author={rec.author} description={rec.description} /> : <></> }
                {recipeDataTable}
                { rec ? <InstructionsCard instructions={rec.instructions} /> : <></>}
            </Stack>
        </div>
    )
}