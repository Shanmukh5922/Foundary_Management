package com.foundry.foundry_management.repository;

import com.foundry.foundry_management.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentRepository extends JpaRepository<Shipment, String> {

}