import { GridColDef, GridRowId } from "@mui/x-data-grid"
import { useEffect } from "react";
import useIngredientContext from "../../../hooks/use-ingredient-context";
import { IngredientContextType } from "../../../context/ingredient";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import IngredientDetails from "../../../types/recipe/ingredientDetails";
import DataTable, { DataGridRow } from "./DataTable";
import AddRowForm from "./AddRowForm";

export default function IngredientDataTable(){
    const {ingredients, fetchIngredients, deleteIngredient, addIngredient} = useIngredientContext() as IngredientContextType;

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]); //memoized method using useCallback() in the ingredient context

    const handleRefresh = () => {
        fetchIngredients();
    }

    const handleDelete = (id: GridRowId) => {
        deleteIngredient(id as number);
    }

    const handleSubmit = (newIngredient: string) => {
        const ingredient: IngredientDetails = {
            name: newIngredient
        };
        addIngredient(ingredient);
    }
    const label = "Ingredient";

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0, type: 'number', sortable: true},
        {field: 'name', headerName: 'Name', flex: 1, type: 'string', sortable: true},
        {
            field: 'delete',
            headerName: ' ',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Grid container justifyContent="flex-end">
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.id)}  >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Grid>
            )
        }
    ];

    let rows: DataGridRow[] = [];
    if(ingredients !== undefined && ingredients !== null){
         rows = ingredients.map(ingredient => {
            return {id: ingredient.id, name: ingredient.name};
        });
    } 
    

    return (
        <Box>
            <DataTable rows={rows} columns={columns} handleRefresh={handleRefresh} />
            <br /><br />
            <AddRowForm handleSubmit={handleSubmit} label={label} />
        </Box>
    )

}