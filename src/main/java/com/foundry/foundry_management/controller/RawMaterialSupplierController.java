package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.RawMaterialSupplier;
import com.foundry.foundry_management.service.RawMaterialSupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/raw-material-suppliers")
@CrossOrigin(origins = "*")
public class RawMaterialSupplierController {

    private final RawMaterialSupplierService service;

    public RawMaterialSupplierController(
            RawMaterialSupplierService service) {
        this.service = service;
    }

    // Get all suppliers
    @GetMapping
    public List<RawMaterialSupplier> getAllSuppliers() {
        return service.getAllSuppliers();
    }

    // Get supplier by ID
    @GetMapping("/{supplierId}")
    public ResponseEntity<RawMaterialSupplier> getSupplierById(
            @PathVariable String supplierId) {

        return service.getSupplierById(supplierId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new supplier
    @PostMapping
    public RawMaterialSupplier addSupplier(
            @RequestBody RawMaterialSupplier supplier) {

        return service.addSupplier(supplier);
    }

    // Update supplier
    @PutMapping("/{supplierId}")
    public RawMaterialSupplier updateSupplier(
            @PathVariable String supplierId,
            @RequestBody RawMaterialSupplier supplier) {

        return service.updateSupplier(supplierId, supplier);
    }

    // Delete supplier
    @DeleteMapping("/{supplierId}")
    public ResponseEntity<Void> deleteSupplier(
            @PathVariable String supplierId) {

        service.deleteSupplier(supplierId);
        return ResponseEntity.noContent().build();
    }
}