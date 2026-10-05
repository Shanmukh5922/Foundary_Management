package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SMELTING_FURNACE")
public class SmeltingFurnace {

    @Id
    @Column(name = "FURNACE_NO")
    private String furnaceNo;

    @Column(name = "STRUCTURAL_LINER_TYPE")
    private String structuralLinerType;

    @Column(name = "HEATING_SOURCE")
    private String heatingSource;

    @Column(name = "TARGET_TEMPERATURE_C")
    private Integer targetTemperatureC;

    // Default constructor
    public SmeltingFurnace() {
    }

    // Getters and Setters

    public String getFurnaceNo() {
        return furnaceNo;
    }

    public void setFurnaceNo(String furnaceNo) {
        this.furnaceNo = furnaceNo;
    }

    public String getStructuralLinerType() {
        return structuralLinerType;
    }

    public void setStructuralLinerType(String structuralLinerType) {
        this.structuralLinerType = structuralLinerType;
    }

    public String getHeatingSource() {
        return heatingSource;
    }

    public void setHeatingSource(String heatingSource) {
        this.heatingSource = heatingSource;
    }

    public Integer getTargetTemperatureC() {
        return targetTemperatureC;
    }

    public void setTargetTemperatureC(Integer targetTemperatureC) {
        this.targetTemperatureC = targetTemperatureC;
    }
}
