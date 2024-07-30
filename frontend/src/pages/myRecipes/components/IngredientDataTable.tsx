import { DataGrid, GridColDef } from "@mui/x-data-grid"


export default function IngredientDataTable(){
    
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 30, type: 'number', sortable: true},
        {field: 'name', headerName: 'Name', width: 70, type: 'string', sortable: true}
    ];

    const rows = [
        {id: 1, name: "test1"},
        {id: 2, name: "test2"},
        {id: 3, name: "test1"},
        {id: 4, name: "test2"},
        {id: 5, name: "test1"},
        {id: 6, name: "test2"},
        {id: 7, name: "test1"},
        {id: 8, name: "test2"},
        {id: 9, name: "test1"},
        {id: 10, name: "test2"}
    ]

    return (
        <div style={{height:400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )


}