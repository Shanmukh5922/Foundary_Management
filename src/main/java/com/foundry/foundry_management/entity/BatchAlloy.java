package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "BATCH_ALLOY")
public class BatchAlloy {

    @Id
    @Column(name = "MELT_ID")
    private String meltId;

    @Column(name = "ALLOY_CLASSIFICATION")
    private String alloyClassification;

    @Column(name = "BASE_ELEMENT")
    private String baseElement;

    @Column(name = "FURNACE_NO")
    private String furnaceNo;

    // Default constructor
    public BatchAlloy() {
    }

    // Getter and Setter for meltId
    public String getMeltId() {
        return meltId;
    }

    public void setMeltId(String meltId) {
        this.meltId = meltId;
    }

    // Getter and Setter for alloyClassification
    public String getAlloyClassification() {
        return alloyClassification;
    }

    public void setAlloyClassification(String alloyClassification) {
        this.alloyClassification = alloyClassification;
    }

    // Getter and Setter for baseElement
    public String getBaseElement() {
        return baseElement;
    }

    public void setBaseElement(String baseElement) {
        this.baseElement = baseElement;
    }

    // Getter and Setter for furnaceNo
    public String getFurnaceNo() {
        return furnaceNo;
    }

    public void setFurnaceNo(String furnaceNo) {
        this.furnaceNo = furnaceNo;
    }
}