package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.MaterialProcurement;
import com.foundry.foundry_management.repository.MaterialProcurementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialProcurementService {

    private final MaterialProcurementRepository repository;

    public MaterialProcurementService(MaterialProcurementRepository repository) {
        this.repository = repository;
    }

    // Get all procurement records
    public List<MaterialProcurement> getAllProcurements() {
        return repository.findAll();
    }

    // Get procurement by ID
    public Optional<MaterialProcurement> getProcurementById(String procurementId) {
        return repository.findById(procurementId);
    }

    // Add new procurement
    public MaterialProcurement addProcurement(MaterialProcurement procurement) {
        return repository.save(procurement);
    }

    // Update procurement
    public MaterialProcurement updateProcurement(
            String procurementId,
            MaterialProcurement procurement) {

        procurement.setProcurementId(procurementId);
        return repository.save(procurement);
    }

    // Delete procurement
    public void deleteProcurement(String procurementId) {
        repository.deleteById(procurementId);
    }
}