package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.CastingProduction;
import com.foundry.foundry_management.service.CastingProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/casting-productions")
@CrossOrigin(origins = "*")
public class CastingProductionController {

    private final CastingProductionService service;

    public CastingProductionController(CastingProductionService service) {
        this.service = service;
    }

    // Get all casting productions
    @GetMapping
    public List<CastingProduction> getAllProductions() {
        return service.getAllProductions();
    }

    // Get production by CAST_ID
    @GetMapping("/{castId}")
    public ResponseEntity<CastingProduction> getProductionById(
            @PathVariable String castId) {

        return service.getProductionById(castId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new casting production
    @PostMapping
    public CastingProduction addProduction(
            @RequestBody CastingProduction castingProduction) {

        return service.addProduction(castingProduction);
    }

    // Update casting production
    @PutMapping("/{castId}")
    public CastingProduction updateProduction(
            @PathVariable String castId,
            @RequestBody CastingProduction castingProduction) {

        return service.updateProduction(castId, castingProduction);
    }

    // Delete casting production
    @DeleteMapping("/{castId}")
    public ResponseEntity<Void> deleteProduction(
            @PathVariable String castId) {

        service.deleteProduction(castId);
        return ResponseEntity.noContent().build();
    }
}