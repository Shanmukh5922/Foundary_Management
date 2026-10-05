package com.foundry.foundry_management.repository;

import com.foundry.foundry_management.entity.QualityInspection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QualityInspectionRepository
        extends JpaRepository<QualityInspection, String> {

}