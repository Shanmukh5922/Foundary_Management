package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.CastingProduction;
import com.foundry.foundry_management.repository.CastingProductionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CastingProductionService {

    private final CastingProductionRepository repository;

    public CastingProductionService(CastingProductionRepository repository) {
        this.repository = repository;
    }

    // Get all casting productions
    public List<CastingProduction> getAllProductions() {
        return repository.findAll();
    }

    // Get casting production by CAST_ID
    public Optional<CastingProduction> getProductionById(String castId) {
        return repository.findById(castId);
    }

    // Add new casting production
    public CastingProduction addProduction(CastingProduction castingProduction) {
        return repository.save(castingProduction);
    }

    // Update casting production
    public CastingProduction updateProduction(
            String castId,
            CastingProduction castingProduction) {

        castingProduction.setCastId(castId);
        return repository.save(castingProduction);
    }

    // Delete casting production
    public void deleteProduction(String castId) {
        repository.deleteById(castId);
    }
}