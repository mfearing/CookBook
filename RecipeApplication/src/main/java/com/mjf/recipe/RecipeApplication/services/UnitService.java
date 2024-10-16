package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.dtos.UnitRequest;
import com.mjf.recipe.RecipeApplication.dtos.UnitResponse;
import com.mjf.recipe.RecipeApplication.entities.Unit;
import com.mjf.recipe.RecipeApplication.exceptions.AppException;
import com.mjf.recipe.RecipeApplication.repositories.UnitRepository;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@NoArgsConstructor
@Service
public class UnitService {

    private final Logger logger = LoggerFactory.getLogger(UnitService.class);

    @Autowired
    private UnitRepository unitRepository;

    public List<UnitResponse> findAll(){
        List<Unit> units = unitRepository.findAll();
        return units.stream().map(unit -> new UnitResponse(unit.getId(), unit.getName())).toList();
    }

    public UnitResponse findById(Long id){
        Optional<Unit> unit = unitRepository.findById(id);
        return unit.map(value -> new UnitResponse(value.getId(), value.getName())).orElse(null);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public UnitResponse save(UnitRequest unitRequest){
        if(unitRepository.findByName(unitRequest.name()).isPresent()){
            throw new AppException("Unit " + unitRequest.name() + " already exists", HttpStatus.BAD_REQUEST);
        }
        Unit unit = unitRepository.save(new Unit(null, unitRequest.name()));
        return new UnitResponse(unit.getId(), unit.getName());
    }

    @Transactional
    public List<UnitResponse> saveAll(List<UnitRequest> unitRequests){
        // Convert UnitRequests to a Map of name to Unit
        Map<String, Unit> unitMap = unitRequests.stream()
                .collect(Collectors.toMap(
                        UnitRequest::name,
                        req -> new Unit(null, req.name()),
                        (existing, replacement) -> existing //keep existing if duplicate value
                ));
        List<Unit> existingUnits = unitRepository.findAllByNameIn(unitMap.keySet().stream().toList());
        existingUnits.forEach(unit -> unitMap.remove(unit.getName()));

        List<Unit> createdUnits = unitRepository.saveAll(unitMap.values());

        List<Unit> allUnits = new ArrayList<>(existingUnits);
        allUnits.addAll(createdUnits);

        return allUnits.stream()
                .map(unit -> new UnitResponse(unit.getId(), unit.getName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteById(Long id){
        unitRepository.deleteById(id);
    }

}
