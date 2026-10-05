package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.Shipment;
import com.foundry.foundry_management.repository.ShipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    private final ShipmentRepository repository;

    public ShipmentService(ShipmentRepository repository) {
        this.repository = repository;
    }

    // Get all shipments
    public List<Shipment> getAllShipments() {
        return repository.findAll();
    }

    // Get shipment by ID
    public Optional<Shipment> getShipmentById(String shipmentId) {
        return repository.findById(shipmentId);
    }

    // Add new shipment
    public Shipment addShipment(Shipment shipment) {
        return repository.save(shipment);
    }

    // Update shipment
    public Shipment updateShipment(
            String shipmentId,
            Shipment shipment) {

        shipment.setShipmentId(shipmentId);
        return repository.save(shipment);
    }

    // Delete shipment
    public void deleteShipment(String shipmentId) {
        repository.deleteById(shipmentId);
    }
}