package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.entities.Unit;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.repositories.UnitRepository;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@Service
public class UnitService {

    private final Logger logger = LoggerFactory.getLogger(UnitService.class);

    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> findAll(){
        return unitRepository.findAll();
    }

    public Optional<Unit> findById(Long id){
        return unitRepository.findById(id);
    }

    @Transactional
    public Unit save(Unit unit){
        if(unitRepository.findByName(unit.getName()).isPresent()){
            throw new AppException("Unit " + unit.getName() + " already exists", HttpStatus.BAD_REQUEST);
        }
        return unitRepository.save(unit);
    }

    @Transactional
    public List<Unit> saveAll(List<Unit> units){

        List<String> namesToCreate = units.stream().map(Unit::getName).toList();
        List<Unit> existingUnits = unitRepository.findAllByNameIn(namesToCreate);
        Set<String> existingUnitNames = existingUnits.stream().map(Unit::getName).collect(Collectors.toSet());
        List<Unit> filteredUnitsToCreate = units.stream().filter(
                unit -> !existingUnitNames.contains(unit.getName())
        ).toList();
        return unitRepository.saveAll(filteredUnitsToCreate);
    }

    @Transactional
    public void deleteById(Long id){
        unitRepository.deleteById(id);
    }

}
