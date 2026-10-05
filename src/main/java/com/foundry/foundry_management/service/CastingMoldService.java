package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.CastingMold;
import com.foundry.foundry_management.repository.CastingMoldRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CastingMoldService {

    private final CastingMoldRepository repository;

    public CastingMoldService(CastingMoldRepository repository) {
        this.repository = repository;
    }

    // Get all molds
    public List<CastingMold> getAllMolds() {
        return repository.findAll();
    }

    // Get mold by MOLD_ID
    public Optional<CastingMold> getMoldById(String moldId) {
        return repository.findById(moldId);
    }

    // Add new mold
    public CastingMold addMold(CastingMold castingMold) {
        return repository.save(castingMold);
    }

    // Update mold
    public CastingMold updateMold(String moldId, CastingMold castingMold) {
        castingMold.setMoldId(moldId);
        return repository.save(castingMold);
    }

    // Delete mold
    public void deleteMold(String moldId) {
        repository.deleteById(moldId);
    }
}