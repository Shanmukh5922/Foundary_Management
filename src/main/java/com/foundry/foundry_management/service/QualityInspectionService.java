package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.QualityInspection;
import com.foundry.foundry_management.repository.QualityInspectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QualityInspectionService {

    private final QualityInspectionRepository repository;

    public QualityInspectionService(QualityInspectionRepository repository) {
        this.repository = repository;
    }

    // Get all inspections
    public List<QualityInspection> getAllInspections() {
        return repository.findAll();
    }

    // Get inspection by ID
    public Optional<QualityInspection> getInspectionById(String inspectionId) {
        return repository.findById(inspectionId);
    }

    // Add new inspection
    public QualityInspection addInspection(QualityInspection inspection) {
        return repository.save(inspection);
    }

    // Update inspection
    public QualityInspection updateInspection(
            String inspectionId,
            QualityInspection inspection) {

        inspection.setInspectionId(inspectionId);
        return repository.save(inspection);
    }

    // Delete inspection
    public void deleteInspection(String inspectionId) {
        repository.deleteById(inspectionId);
    }
}