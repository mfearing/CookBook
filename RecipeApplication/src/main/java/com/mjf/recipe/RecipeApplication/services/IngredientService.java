package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.dtos.IngredientRequest;
import com.mjf.recipe.RecipeApplication.dtos.IngredientResponse;
import com.mjf.recipe.RecipeApplication.entities.Ingredient;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.repositories.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class IngredientService {

    private static final Logger logger = LoggerFactory.getLogger(IngredientService.class);

    private final IngredientRepository ingredientRepository;

    public List<IngredientResponse> findAll(){
        List<Ingredient> ingredients = ingredientRepository.findAll();
        return ingredients.stream().map(ingredient -> new IngredientResponse(ingredient.getId(), ingredient.getName())).toList();
    }

    public IngredientResponse findById(Long id){
        Optional<Ingredient> ingredient = ingredientRepository.findById(id);
        return ingredient.map(value -> new IngredientResponse(value.getId(), value.getName())).orElse(null);
    }

    @Transactional
    public IngredientResponse save(IngredientRequest ingredientRequest){
        if(ingredientRepository.findByName(ingredientRequest.name()).isPresent()){
            throw new AppException("Ingredient " + ingredientRequest.name() + " already exists.", HttpStatus.BAD_REQUEST);
        }
        Ingredient ingredient = ingredientRepository.save(new Ingredient(null, ingredientRequest.name()));
        return new IngredientResponse(ingredient.getId(), ingredient.getName());
    }

    @Transactional
    public List<IngredientResponse> saveAll(List<IngredientRequest> ingredientRequests){
        // Convert UnitRequests to a Map of name to Unit
        Map<String, Ingredient> ingredientMap = ingredientRequests.stream()
                .collect(Collectors.toMap(
                        IngredientRequest::name,
                        ing -> new Ingredient(null, ing.name()),
                        (existing, replacement) -> existing //keep existing if duplicate value
                ));

        List<Ingredient> existingIngredients = ingredientRepository.findAllByNameIn(ingredientMap.keySet().stream().toList());
        existingIngredients.forEach(ing -> ingredientMap.remove(ing.getName()));

        List<Ingredient> createdIngredients = ingredientRepository.saveAll(ingredientMap.values());

        List<Ingredient> allIngredients = new ArrayList<>(existingIngredients);
        allIngredients.addAll(createdIngredients);

        return allIngredients.stream()
                .map(unit -> new IngredientResponse(unit.getId(), unit.getName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteById(Long id){
        ingredientRepository.deleteById(id);
    }


}
