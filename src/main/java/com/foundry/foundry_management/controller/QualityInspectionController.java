package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.QualityInspection;
import com.foundry.foundry_management.service.QualityInspectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quality-inspections")
@CrossOrigin(origins = "*")
public class QualityInspectionController {

    private final QualityInspectionService service;

    public QualityInspectionController(QualityInspectionService service) {
        this.service = service;
    }

    // Get all inspections
    @GetMapping
    public List<QualityInspection> getAllInspections() {
        return service.getAllInspections();
    }

    // Get inspection by ID
    @GetMapping("/{inspectionId}")
    public ResponseEntity<QualityInspection> getInspectionById(
            @PathVariable String inspectionId) {

        return service.getInspectionById(inspectionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new inspection
    @PostMapping
    public QualityInspection addInspection(
            @RequestBody QualityInspection inspection) {

        return service.addInspection(inspection);
    }

    // Update inspection
    @PutMapping("/{inspectionId}")
    public QualityInspection updateInspection(
            @PathVariable String inspectionId,
            @RequestBody QualityInspection inspection) {

        return service.updateInspection(inspectionId, inspection);
    }

    // Delete inspection
    @DeleteMapping("/{inspectionId}")
    public ResponseEntity<Void> deleteInspection(
            @PathVariable String inspectionId) {

        service.deleteInspection(inspectionId);
        return ResponseEntity.noContent().build();
    }
}