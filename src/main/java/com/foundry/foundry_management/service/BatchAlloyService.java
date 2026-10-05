package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.BatchAlloy;
import com.foundry.foundry_management.repository.BatchAlloyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchAlloyService {

    private final BatchAlloyRepository repository;

    public BatchAlloyService(BatchAlloyRepository repository) {
        this.repository = repository;
    }

    // Get all alloys
    public List<BatchAlloy> getAllAlloys() {
        return repository.findAll();
    }

    // Get alloy by MELT_ID
    public Optional<BatchAlloy> getAlloyById(String meltId) {
        return repository.findById(meltId);
    }

    // Add new alloy
    public BatchAlloy addAlloy(BatchAlloy batchAlloy) {
        return repository.save(batchAlloy);
    }

    // Update alloy
    public BatchAlloy updateAlloy(String meltId, BatchAlloy batchAlloy) {
        batchAlloy.setMeltId(meltId);
        return repository.save(batchAlloy);
    }

    // Delete alloy
    public void deleteAlloy(String meltId) {
        repository.deleteById(meltId);
    }
}