package com.foundry.foundry_management.repository;

import com.foundry.foundry_management.entity.RawMaterialSupplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawMaterialSupplierRepository
        extends JpaRepository<RawMaterialSupplier, String> {

}