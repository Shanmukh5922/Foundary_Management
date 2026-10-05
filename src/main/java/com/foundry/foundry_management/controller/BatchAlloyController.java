package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.BatchAlloy;
import com.foundry.foundry_management.service.BatchAlloyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batch-alloys")
@CrossOrigin(origins = "*")
public class BatchAlloyController {

    private final BatchAlloyService service;

    public BatchAlloyController(BatchAlloyService service) {
        this.service = service;
    }

    // Get all alloys
    @GetMapping
    public List<BatchAlloy> getAllAlloys() {
        return service.getAllAlloys();
    }

    // Get alloy by MELT_ID
    @GetMapping("/{meltId}")
    public ResponseEntity<BatchAlloy> getAlloyById(@PathVariable String meltId) {

        return service.getAlloyById(meltId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new alloy
    @PostMapping
    public BatchAlloy addAlloy(@RequestBody BatchAlloy batchAlloy) {
        return service.addAlloy(batchAlloy);
    }

    // Update alloy
    @PutMapping("/{meltId}")
    public BatchAlloy updateAlloy(
            @PathVariable String meltId,
            @RequestBody BatchAlloy batchAlloy) {

        return service.updateAlloy(meltId, batchAlloy);
    }

    // Delete alloy
    @DeleteMapping("/{meltId}")
    public ResponseEntity<Void> deleteAlloy(@PathVariable String meltId) {

        service.deleteAlloy(meltId);
        return ResponseEntity.noContent().build();
    }
}