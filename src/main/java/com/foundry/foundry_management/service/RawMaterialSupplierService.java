package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.RawMaterialSupplier;
import com.foundry.foundry_management.repository.RawMaterialSupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RawMaterialSupplierService {

    private final RawMaterialSupplierRepository repository;

    public RawMaterialSupplierService(RawMaterialSupplierRepository repository) {
        this.repository = repository;
    }

    // Get all suppliers
    public List<RawMaterialSupplier> getAllSuppliers() {
        return repository.findAll();
    }

    // Get supplier by ID
    public Optional<RawMaterialSupplier> getSupplierById(String supplierId) {
        return repository.findById(supplierId);
    }

    // Add new supplier
    public RawMaterialSupplier addSupplier(RawMaterialSupplier supplier) {
        return repository.save(supplier);
    }

    // Update supplier
    public RawMaterialSupplier updateSupplier(
            String supplierId,
            RawMaterialSupplier supplier) {

        supplier.setSupplierId(supplierId);
        return repository.save(supplier);
    }

    // Delete supplier
    public void deleteSupplier(String supplierId) {
        repository.deleteById(supplierId);
    }
}