package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.DefectLog;
import com.foundry.foundry_management.service.DefectLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/defect-logs")
@CrossOrigin(origins = "*")
public class DefectLogController {

    private final DefectLogService service;

    public DefectLogController(DefectLogService service) {
        this.service = service;
    }

    // Get all defects
    @GetMapping
    public List<DefectLog> getAllDefects() {
        return service.getAllDefects();
    }

    // Get defect by DEFECT_ID
    @GetMapping("/{defectId}")
    public ResponseEntity<DefectLog> getDefectById(
            @PathVariable String defectId) {

        return service.getDefectById(defectId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new defect
    @PostMapping
    public DefectLog addDefect(@RequestBody DefectLog defectLog) {
        return service.addDefect(defectLog);
    }

    // Update defect
    @PutMapping("/{defectId}")
    public DefectLog updateDefect(
            @PathVariable String defectId,
            @RequestBody DefectLog defectLog) {

        return service.updateDefect(defectId, defectLog);
    }

    // Delete defect
    @DeleteMapping("/{defectId}")
    public ResponseEntity<Void> deleteDefect(
            @PathVariable String defectId) {

        service.deleteDefect(defectId);
        return ResponseEntity.noContent().build();
    }
}