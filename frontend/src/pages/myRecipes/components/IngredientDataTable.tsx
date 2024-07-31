import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { useEffect } from "react";
import useIngredientContext from "../../../hooks/use-ingredient-context";
import { IngredientContextType } from "../../../context/ingredient";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Delete, Refresh } from "@mui/icons-material";

export default function IngredientDataTable(){
    const {ingredients, fetchIngredients, deleteIngredient} = useIngredientContext() as IngredientContextType;

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]); //memoized method using useCallback() in the ingredient context

    const handleRefresh = () => {
        fetchIngredients(); //this is being called, but not sure it's refreshing the component
    }

    const handleDelete = (id: GridRowId) => {
        deleteIngredient(id as number);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0, type: 'number', sortable: true},
        {field: 'name', headerName: 'Name', flex: 130, type: 'string', sortable: true},
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
        </div>
    )


}