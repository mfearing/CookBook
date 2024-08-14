import { Refresh } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface DataGridRow {
    id: number | undefined;
    [key: string]: string | number | boolean | Date | undefined;
}

export interface DataTableProps<T extends DataGridRow>{
    rows: T[],
    columns: GridColDef[],
    handleRefresh: () => void
}

export default function DataTable<T extends DataGridRow>({rows, columns, handleRefresh}: DataTableProps<T>){
    
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
                        paginationModel: {page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
        </div>
    )
}