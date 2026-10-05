package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "RAW_MATERIAL_SUPPLIER")
public class RawMaterialSupplier {

    @Id
    @Column(name = "SUPPLIER_ID")
    private String supplierId;

    @Column(name = "MATERIAL_GRADE_SUPPLIED")
    private String materialGradeSupplied;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "CASTING_MOLD_TYPE")
    private String castingMoldType;

    // Default constructor
    public RawMaterialSupplier() {
    }

    // Getters and Setters

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public String getMaterialGradeSupplied() {
        return materialGradeSupplied;
    }

    public void setMaterialGradeSupplied(String materialGradeSupplied) {
        this.materialGradeSupplied = materialGradeSupplied;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCastingMoldType() {
        return castingMoldType;
    }

    public void setCastingMoldType(String castingMoldType) {
        this.castingMoldType = castingMoldType;
    }
}