package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.dtos.UnitRequest;
import com.mjf.recipe.RecipeApplication.dtos.UnitResponse;
import com.mjf.recipe.RecipeApplication.services.UnitService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/units")
public class UnitController {

    private final UnitService unitService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UnitResponse> getAllUnits() {
        return unitService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UnitResponse getUnitById(@PathVariable Long id){
        return unitService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UnitResponse createUnit(@RequestBody UnitRequest unit){
        return unitService.save(unit);
    }

    @PostMapping("/bulk")
    @ResponseStatus(HttpStatus.CREATED)
    public List<UnitResponse> createUnits(@RequestBody List<UnitRequest> units){
        return unitService.saveAll(units);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUnit(@PathVariable Long id){
        unitService.deleteById(id);
    }

}
