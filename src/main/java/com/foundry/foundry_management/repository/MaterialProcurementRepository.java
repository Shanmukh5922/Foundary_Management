package com.foundry.foundry_management.repository;

import com.foundry.foundry_management.entity.MaterialProcurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialProcurementRepository
        extends JpaRepository<MaterialProcurement, String> {

}