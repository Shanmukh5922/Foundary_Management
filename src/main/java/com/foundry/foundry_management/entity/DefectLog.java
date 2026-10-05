package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DEFECT_LOG")
public class DefectLog {

    @Id
    @Column(name = "DEFECT_ID")
    private String defectId;

    @Column(name = "INSPECTION_ID")
    private String inspectionId;

    @Column(name = "DEFECT_TYPE")
    private String defectType;

    @Column(name = "SEVERITY_LEVEL")
    private String severityLevel;

    // Default constructor
    public DefectLog() {
    }

    // Getters and Setters

    public String getDefectId() {
        return defectId;
    }

    public void setDefectId(String defectId) {
        this.defectId = defectId;
    }

    public String getInspectionId() {
        return inspectionId;
    }

    public void setInspectionId(String inspectionId) {
        this.inspectionId = inspectionId;
    }

    public String getDefectType() {
        return defectType;
    }

    public void setDefectType(String defectType) {
        this.defectType = defectType;
    }

    public String getSeverityLevel() {
        return severityLevel;
    }

    public void setSeverityLevel(String severityLevel) {
        this.severityLevel = severityLevel;
    }
}