import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import useIngredientContext from "../../../hooks/use-ingredient-context";
import { IngredientContextType } from "../../../context/ingredient";
import { Box, Button, FormControl, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Refresh } from "@mui/icons-material";
import IngredientDetails from "../../../types/recipe/ingredientDetails";

export default function IngredientDataTable(){
    const {ingredients, fetchIngredients, deleteIngredient, addIngredient} = useIngredientContext() as IngredientContextType;
    const [newIngredient, setNewIngredient] = useState('');

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]); //memoized method using useCallback() in the ingredient context

    const handleRefresh = () => {
        fetchIngredients(); //this is being called, but not sure it's refreshing the component
    }

    const handleDelete = (id: GridRowId) => {
        deleteIngredient(id as number);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewIngredient(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const ingredient: IngredientDetails = {
            name: newIngredient
        };
        addIngredient(ingredient);
        setNewIngredient('');
    }

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

    const rows = ingredients?.map(ingredient => {
        return {id: ingredient.id, name: ingredient.name}
    });

    return (
        <div style={{height:400, width: '100%'}}>
            <Grid container justifyContent="flex-end">
                <Tooltip title="Refresh">
                    <IconButton onClick={handleRefresh} aria-label="refresh" size="small" >
                        <Refresh />
                    </IconButton>
                </Tooltip>
            </Grid>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    width: '100%',
                    maxWidth: 400,
                    mx: 'auto',
                    mt: 4,
                }}
            >
                <FormControl fullWidth>
                    <TextField
                        label="New Ingredient"
                        value={newIngredient}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>

        </div>
    )

}