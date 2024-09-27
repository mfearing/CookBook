package com.mjf.recipe.RecipeApplication.controllers;

import com.mjf.recipe.RecipeApplication.entities.Unit;
import com.mjf.recipe.RecipeApplication.services.UnitService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/units")
public class UnitController {
    private static final Logger logger = LoggerFactory.getLogger(UnitController.class);

    @Autowired
    private UnitService unitService;

    @GetMapping
    public List<Unit> getAllUnits() {
        return unitService.findAll();
    }

    @GetMapping("/{id}")
    public Unit getUnitById(@PathVariable Long id){
        return unitService.findById(id).orElse(null);
    }

    @PostMapping
    public Unit createUnit(@RequestBody Unit unit){
        return unitService.save(unit);
    }

    @PostMapping("/bulk")
    public List<Unit> createUnits(@RequestBody List<Unit> units){
        return unitService.saveAll(units);
    }

    @DeleteMapping("/{id}")
    public void deleteUnit(@PathVariable Long id){
        unitService.deleteById(id);
    }

}
