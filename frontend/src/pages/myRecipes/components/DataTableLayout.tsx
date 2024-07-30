import IngredientDataTable from "./IngredientDataTable";
import { DataTableLayoutProps } from "./RecipeLayout";



export default function DataTableLayout({type}: DataTableLayoutProps){
    
    let content = <>{type}</>;
    if(type === 'ingredient'){
        content = <IngredientDataTable />;
    }

    return (
        <div>{content}</div>
    )
}