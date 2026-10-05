package com.foundry.foundry_management.repository;

import com.foundry.foundry_management.entity.DefectLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DefectLogRepository extends JpaRepository<DefectLog, String> {

}