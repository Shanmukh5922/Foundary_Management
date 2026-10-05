package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.SmeltingFurnace;
import com.foundry.foundry_management.service.SmeltingFurnaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/smelting-furnaces")
@CrossOrigin(origins = "*")
public class SmeltingFurnaceController {

    private final SmeltingFurnaceService service;

    public SmeltingFurnaceController(SmeltingFurnaceService service) {
        this.service = service;
    }

    // Get all furnaces
    @GetMapping
    public List<SmeltingFurnace> getAllFurnaces() {
        return service.getAllFurnaces();
    }

    // Get furnace by number
    @GetMapping("/{furnaceNo}")
    public ResponseEntity<SmeltingFurnace> getFurnaceById(
            @PathVariable String furnaceNo) {

        return service.getFurnaceById(furnaceNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new furnace
    @PostMapping
    public SmeltingFurnace addFurnace(
            @RequestBody SmeltingFurnace furnace) {

        return service.addFurnace(furnace);
    }

    // Update furnace
    @PutMapping("/{furnaceNo}")
    public SmeltingFurnace updateFurnace(
            @PathVariable String furnaceNo,
            @RequestBody SmeltingFurnace furnace) {

        return service.updateFurnace(furnaceNo, furnace);
    }

    // Delete furnace
    @DeleteMapping("/{furnaceNo}")
    public ResponseEntity<Void> deleteFurnace(
            @PathVariable String furnaceNo) {

        service.deleteFurnace(furnaceNo);
        return ResponseEntity.noContent().build();
    }
}