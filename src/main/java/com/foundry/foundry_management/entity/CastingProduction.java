package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CASTING_PRODUCTION")
public class CastingProduction {

    @Id
    @Column(name = "CAST_ID")
    private String castId;

    @Column(name = "MOLD_ID")
    private String moldId;

    @Column(name = "MELT_ID")
    private String meltId;

    @Column(name = "OPERATOR_ID")
    private String operatorId;

    @Column(name = "WEIGHT_KG")
    private Double weightKg;

    // Default constructor
    public CastingProduction() {
    }

    // Getters and Setters

    public String getCastId() {
        return castId;
    }

    public void setCastId(String castId) {
        this.castId = castId;
    }

    public String getMoldId() {
        return moldId;
    }

    public void setMoldId(String moldId) {
        this.moldId = moldId;
    }

    public String getMeltId() {
        return meltId;
    }

    public void setMeltId(String meltId) {
        this.meltId = meltId;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(String operatorId) {
        this.operatorId = operatorId;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }
}