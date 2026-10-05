package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "QUALITY_INSPECTION")
public class QualityInspection {

    @Id
    @Column(name = "INSPECTION_ID")
    private String inspectionId;

    @Column(name = "CAST_ID")
    private String castId;

    @Column(name = "OPERATOR_ID")
    private String operatorId;

    @Column(name = "RESULT")
    private String result;

    // Default constructor
    public QualityInspection() {
    }

    // Getters and Setters

    public String getInspectionId() {
        return inspectionId;
    }

    public void setInspectionId(String inspectionId) {
        this.inspectionId = inspectionId;
    }

    public String getCastId() {
        return castId;
    }

    public void setCastId(String castId) {
        this.castId = castId;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(String operatorId) {
        this.operatorId = operatorId;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}