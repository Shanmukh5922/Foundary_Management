package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.Operator;
import com.foundry.foundry_management.service.OperatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operators")
@CrossOrigin(origins = "*")
public class OperatorController {

    private final OperatorService service;

    public OperatorController(OperatorService service) {
        this.service = service;
    }

    // Get all operators
    @GetMapping
    public List<Operator> getAllOperators() {
        return service.getAllOperators();
    }

    // Get operator by ID
    @GetMapping("/{operatorId}")
    public ResponseEntity<Operator> getOperatorById(
            @PathVariable String operatorId) {

        return service.getOperatorById(operatorId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new operator
    @PostMapping
    public Operator addOperator(@RequestBody Operator operator) {
        return service.addOperator(operator);
    }

    // Update operator
    @PutMapping("/{operatorId}")
    public Operator updateOperator(
            @PathVariable String operatorId,
            @RequestBody Operator operator) {

        return service.updateOperator(operatorId, operator);
    }

    // Delete operator
    @DeleteMapping("/{operatorId}")
    public ResponseEntity<Void> deleteOperator(
            @PathVariable String operatorId) {

        service.deleteOperator(operatorId);
        return ResponseEntity.noContent().build();
    }
}