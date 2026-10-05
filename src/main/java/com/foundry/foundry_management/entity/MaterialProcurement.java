package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "MATERIAL_PROCUREMENT")
public class MaterialProcurement {

    @Id
    @Column(name = "PROCUREMENT_ID")
    private String procurementId;

    @Column(name = "SUPPLIER_ID")
    private String supplierId;

    @Column(name = "MELT_ID")
    private String meltId;

    @Column(name = "QUANTITY_KG")
    private Double quantityKg;

    @Column(name = "MATERIAL_TYPE")
    private String materialType;

    // Default constructor
    public MaterialProcurement() {
    }

    // Getters and Setters

    public String getProcurementId() {
        return procurementId;
    }

    public void setProcurementId(String procurementId) {
        this.procurementId = procurementId;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public String getMeltId() {
        return meltId;
    }

    public void setMeltId(String meltId) {
        this.meltId = meltId;
    }

    public Double getQuantityKg() {
        return quantityKg;
    }

    public void setQuantityKg(Double quantityKg) {
        this.quantityKg = quantityKg;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }
}