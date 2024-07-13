package com.mjf.recipe.RecipeApplication.services;

import com.mjf.recipe.RecipeApplication.entities.Unit;
import com.mjf.recipe.RecipeApplication.repositories.UnitRepository;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
        return unitRepository.save(unit);
    }

    @Transactional
    public List<Unit> saveAll(List<Unit> units){
        return unitRepository.saveAll(units);
    }

    @Transactional
    public void deleteById(Long id){
        unitRepository.deleteById(id);
    }

}
