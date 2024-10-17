import { GridColDef, GridRowId } from "@mui/x-data-grid"
import { useEffect } from "react";
import useUnitContext from "../../../hooks/use-unit-context";
import { UnitContextType } from "../../../context/unit";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import UnitDetails from "../../../types/recipe/unitDetails";
import DataTable, { DataGridRow } from "../../../component/DataTable";
import AddRowForm from "./AddRowForm";

export default function UnitDataTable(){
    const {units, fetchUnits, deleteUnit, addUnit} = useUnitContext() as UnitContextType;

    useEffect(() => {
        fetchUnits();
    }, [fetchUnits]); //memoized method using useCallback() in the unit context

    const handleRefresh = () => {
        fetchUnits();
    }

    const handleDelete = (id: GridRowId) => {
        deleteUnit(id as number);
    }

    const handleSubmit = (newUnit: string) => {
        const unit: UnitDetails = {
            name: newUnit
        };
        addUnit(unit);
    }
    const label = "Unit";

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
    if(units !== undefined && units !== null){
         rows = units.map(unit => {
            return {id: unit.id, name: unit.name};
        });
    } 

    return (
        <>
            <DataTable label="Units" rows={rows} columns={columns} handleRefresh={handleRefresh} />
            <br /><br />
            <AddRowForm handleSubmit={handleSubmit} label={label} />
        </>
    )

}