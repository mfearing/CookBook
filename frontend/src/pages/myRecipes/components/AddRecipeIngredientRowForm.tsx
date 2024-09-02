import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import IngredientDetails from "../../../types/recipe/ingredientDetails";
import useIngredientContext from "../../../hooks/use-ingredient-context";
import useUnitContext from "../../../hooks/use-unit-context";
import { IngredientContextType } from "../../../context/ingredient";
import { UnitContextType } from "../../../context/unit";
import UnitDetails from "../../../types/recipe/unitDetails";

export interface AddRecipeIngredientRowFormProps {
    handleRecipeIngredientCreate: (ingredientId: number, unitId: number, quantity: number) => void
}

export default function AddRecipeIngredientRowForm({handleRecipeIngredientCreate}: AddRecipeIngredientRowFormProps){
    const [quantity, setQuantity] = useState<string>('');
    const [ingredient, setIngredient] = useState<IngredientDetails | null>(null);
    const [unit, setUnit] = useState<UnitDetails | null>(null);
    const {ingredients, fetchIngredients} = useIngredientContext() as IngredientContextType;
    const {units, fetchUnits} = useUnitContext() as UnitContextType;

    useEffect(() => {
        fetchIngredients();
        fetchUnits();
    }, [fetchIngredients, fetchUnits]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        if((val === '' || /^[0-9\b.]+$/.test(val))){
            if(val.split('.').length <= 2){
                setQuantity(val);
            }
        }
    }

    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(ingredient && ingredient.id && unit && unit.id && quantity){
            const quantityNum = quantity as unknown as number; //data validation happens in handleQuantityChange, not sure how to do this properly yet
            handleRecipeIngredientCreate(ingredient?.id, unit?.id, quantityNum);
            setIngredient(null);
            setUnit(null);
            setQuantity('');
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleCreateSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',
                maxWidth: 800,
                mt: 2,
                alignItems: 'center',
            }}
        >
            <Box sx={{flex: 1}}>
                <Autocomplete
                    options={ingredients}
                    getOptionLabel={(ingredient) => ingredient.name}
                    value={ingredient}
                    onChange={(_event, val) => {
                        setIngredient(val);
                    }}
                    renderInput={
                        (params) => <TextField {...params} label="Ingredient" variant="outlined"  />
                    }
                />
            </Box>
            <Box sx={{flex: 1}}>
                <Autocomplete
                    options={units}
                    getOptionLabel={(unit) => unit.name}
                    value={unit}
                    onChange={(_event, val) => {
                        setUnit(val);
                    }}
                    renderInput={
                        (params) => <TextField {...params} label="Unit" variant="outlined"  />
                    }
                />
            </Box>
            <Box sx={{flex: 1}}>
                <TextField
                    id="quantity-input"
                    label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    type="text" // We use type "text" to control the input manually
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*.[0-9]' }}
                    variant="outlined"
                    required
                />
            </Box>
            <Button type="submit" variant="contained" color="primary">
                Add
            </Button>
        </Box>
    );
}