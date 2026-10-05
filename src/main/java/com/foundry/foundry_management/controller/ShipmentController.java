package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.Shipment;
import com.foundry.foundry_management.service.ShipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "*")
public class ShipmentController {

    private final ShipmentService service;

    public ShipmentController(ShipmentService service) {
        this.service = service;
    }

    // Get all shipments
    @GetMapping
    public List<Shipment> getAllShipments() {
        return service.getAllShipments();
    }

    // Get shipment by ID
    @GetMapping("/{shipmentId}")
    public ResponseEntity<Shipment> getShipmentById(
            @PathVariable String shipmentId) {

        return service.getShipmentById(shipmentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new shipment
    @PostMapping
    public Shipment addShipment(@RequestBody Shipment shipment) {
        return service.addShipment(shipment);
    }

    // Update shipment
    @PutMapping("/{shipmentId}")
    public Shipment updateShipment(
            @PathVariable String shipmentId,
            @RequestBody Shipment shipment) {

        return service.updateShipment(shipmentId, shipment);
    }

    // Delete shipment
    @DeleteMapping("/{shipmentId}")
    public ResponseEntity<Void> deleteShipment(
            @PathVariable String shipmentId) {

        service.deleteShipment(shipmentId);
        return ResponseEntity.noContent().build();
    }
}