package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SHIPMENT")
public class Shipment {

    @Id
    @Column(name = "SHIPMENT_ID")
    private String shipmentId;

    @Column(name = "ORDER_ID")
    private String orderId;

    @Column(name = "CAST_ID")
    private String castId;

    @Column(name = "SHIPMENT_STATUS")
    private String shipmentStatus;

    // Default constructor
    public Shipment() {
    }

    // Getters and Setters

    public String getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(String shipmentId) {
        this.shipmentId = shipmentId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCastId() {
        return castId;
    }

    public void setCastId(String castId) {
        this.castId = castId;
    }

    public String getShipmentStatus() {
        return shipmentStatus;
    }

    public void setShipmentStatus(String shipmentStatus) {
        this.shipmentStatus = shipmentStatus;
    }
}