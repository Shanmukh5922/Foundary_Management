package com.foundry.foundry_management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "CUSTOMER_ORDER")
public class CustomerOrder {

    @Id
    @Column(name = "ORDER_ID")
    private String orderId;

    @Column(name = "CUSTOMER_NAME")
    private String customerName;

    @Column(name = "QUANTITY_ORDERED")
    private Long quantityOrdered;

    @Column(name = "DELIVERY_DEADLINE")
    private LocalDate deliveryDeadline;

    // Default constructor
    public CustomerOrder() {
    }

    // Getters and Setters

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Long getQuantityOrdered() {
        return quantityOrdered;
    }

    public void setQuantityOrdered(Long quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
    }

    public LocalDate getDeliveryDeadline() {
        return deliveryDeadline;
    }

    public void setDeliveryDeadline(LocalDate deliveryDeadline) {
        this.deliveryDeadline = deliveryDeadline;
    }
}