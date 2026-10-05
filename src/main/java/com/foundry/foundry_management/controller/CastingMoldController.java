package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.CastingMold;
import com.foundry.foundry_management.service.CastingMoldService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/casting-molds")
@CrossOrigin(origins = "*")
public class CastingMoldController {

    private final CastingMoldService service;

    public CastingMoldController(CastingMoldService service) {
        this.service = service;
    }

    // Get all molds
    @GetMapping
    public List<CastingMold> getAllMolds() {
        return service.getAllMolds();
    }

    // Get mold by MOLD_ID
    @GetMapping("/{moldId}")
    public ResponseEntity<CastingMold> getMoldById(@PathVariable String moldId) {

        return service.getMoldById(moldId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new mold
    @PostMapping
    public CastingMold addMold(@RequestBody CastingMold castingMold) {
        return service.addMold(castingMold);
    }

    // Update mold
    @PutMapping("/{moldId}")
    public CastingMold updateMold(
            @PathVariable String moldId,
            @RequestBody CastingMold castingMold) {

        return service.updateMold(moldId, castingMold);
    }

    // Delete mold
    @DeleteMapping("/{moldId}")
    public ResponseEntity<Void> deleteMold(@PathVariable String moldId) {

        service.deleteMold(moldId);
        return ResponseEntity.noContent().build();
    }
}