package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CASTING_MOLD")
public class CastingMold {

    @Id
    @Column(name = "MOLD_ID")
    private String moldId;

    @Column(name = "MOLD_PATTERN_NAME")
    private String moldPatternName;

    @Column(name = "MOLD_MATERIAL")
    private String moldMaterial;

    @Column(name = "CAVITY_COUNT")
    private Long cavityCount;

    // Default constructor
    public CastingMold() {
    }

    // Getters and Setters

    public String getMoldId() {
        return moldId;
    }

    public void setMoldId(String moldId) {
        this.moldId = moldId;
    }

    public String getMoldPatternName() {
        return moldPatternName;
    }

    public void setMoldPatternName(String moldPatternName) {
        this.moldPatternName = moldPatternName;
    }

    public String getMoldMaterial() {
        return moldMaterial;
    }

    public void setMoldMaterial(String moldMaterial) {
        this.moldMaterial = moldMaterial;
    }

    public Long getCavityCount() {
        return cavityCount;
    }

    public void setCavityCount(Long cavityCount) {
        this.cavityCount = cavityCount;
    }
}