package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.MaterialProcurement;
import com.foundry.foundry_management.service.MaterialProcurementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/material-procurements")
@CrossOrigin(origins = "*")
public class MaterialProcurementController {

    private final MaterialProcurementService service;

    public MaterialProcurementController(MaterialProcurementService service) {
        this.service = service;
    }

    // Get all procurement records
    @GetMapping
    public List<MaterialProcurement> getAllProcurements() {
        return service.getAllProcurements();
    }

    // Get procurement by ID
    @GetMapping("/{procurementId}")
    public ResponseEntity<MaterialProcurement> getProcurementById(
            @PathVariable String procurementId) {

        return service.getProcurementById(procurementId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new procurement
    @PostMapping
    public MaterialProcurement addProcurement(
            @RequestBody MaterialProcurement procurement) {

        return service.addProcurement(procurement);
    }

    // Update procurement
    @PutMapping("/{procurementId}")
    public MaterialProcurement updateProcurement(
            @PathVariable String procurementId,
            @RequestBody MaterialProcurement procurement) {

        return service.updateProcurement(procurementId, procurement);
    }

    // Delete procurement
    @DeleteMapping("/{procurementId}")
    public ResponseEntity<Void> deleteProcurement(
            @PathVariable String procurementId) {

        service.deleteProcurement(procurementId);
        return ResponseEntity.noContent().build();
    }
}