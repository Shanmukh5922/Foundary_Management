package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "OPERATOR")
public class Operator {

    @Id
    @Column(name = "OPERATOR_ID")
    private String operatorId;

    @Column(name = "OPERATOR_NAME")
    private String operatorName;

    @Column(name = "SHIFT")
    private String shift;

    @Column(name = "CERTIFICATION_LEVEL")
    private String certificationLevel;

    // Default constructor
    public Operator() {
    }

    // Getters and Setters

    public String getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(String operatorId) {
        this.operatorId = operatorId;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }

    public String getCertificationLevel() {
        return certificationLevel;
    }

    public void setCertificationLevel(String certificationLevel) {
        this.certificationLevel = certificationLevel;
    }
}