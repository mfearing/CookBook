import { Refresh } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface DataGridRow {
    id: number | undefined;
    [key: string]: string | number | boolean | Date | undefined;
}

export interface DataTableProps<T extends DataGridRow>{
    label: string,
    rows: T[],
    columns: GridColDef[],
    handleRefresh: () => void
}

export default function DataTable<T extends DataGridRow>({label, rows, columns, handleRefresh}: DataTableProps<T>){
    
    return (
        <div style={{height:400, width: '100%'}}>
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h6" sx={{ textAlign: 'left', ml: 2 }}>
                        {label}
                    </Typography>
                </Grid>
                <Grid item>
                    <Tooltip title="Refresh">
                        <IconButton onClick={handleRefresh} aria-label="refresh" size="small" >
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                </Grid>
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