package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.SmeltingFurnace;
import com.foundry.foundry_management.repository.SmeltingFurnaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SmeltingFurnaceService {

    private final SmeltingFurnaceRepository repository;

    public SmeltingFurnaceService(SmeltingFurnaceRepository repository) {
        this.repository = repository;
    }

    // Get all furnaces
    public List<SmeltingFurnace> getAllFurnaces() {
        return repository.findAll();
    }

    // Get furnace by number
    public Optional<SmeltingFurnace> getFurnaceById(String furnaceNo) {
        return repository.findById(furnaceNo);
    }

    // Add new furnace
    public SmeltingFurnace addFurnace(SmeltingFurnace furnace) {
        return repository.save(furnace);
    }

    // Update furnace
    public SmeltingFurnace updateFurnace(
            String furnaceNo,
            SmeltingFurnace furnace) {

        furnace.setFurnaceNo(furnaceNo);
        return repository.save(furnace);
    }

    // Delete furnace
    public void deleteFurnace(String furnaceNo) {
        repository.deleteById(furnaceNo);
    }
}