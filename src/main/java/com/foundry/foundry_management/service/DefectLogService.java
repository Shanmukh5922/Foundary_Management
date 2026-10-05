package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.DefectLog;
import com.foundry.foundry_management.repository.DefectLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DefectLogService {

    private final DefectLogRepository repository;

    public DefectLogService(DefectLogRepository repository) {
        this.repository = repository;
    }

    // Get all defects
    public List<DefectLog> getAllDefects() {
        return repository.findAll();
    }

    // Get defect by DEFECT_ID
    public Optional<DefectLog> getDefectById(String defectId) {
        return repository.findById(defectId);
    }

    // Add new defect
    public DefectLog addDefect(DefectLog defectLog) {
        return repository.save(defectLog);
    }

    // Update defect
    public DefectLog updateDefect(
            String defectId,
            DefectLog defectLog) {

        defectLog.setDefectId(defectId);
        return repository.save(defectLog);
    }

    // Delete defect
    public void deleteDefect(String defectId) {
        repository.deleteById(defectId);
    }
}