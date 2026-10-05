package com.foundry.foundry_management.controller;

import com.foundry.foundry_management.entity.CustomerOrder;
import com.foundry.foundry_management.service.CustomerOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-orders")
@CrossOrigin(origins = "*")
public class CustomerOrderController {

    private final CustomerOrderService service;

    public CustomerOrderController(CustomerOrderService service) {
        this.service = service;
    }

    // Get all customer orders
    @GetMapping
    public List<CustomerOrder> getAllOrders() {
        return service.getAllOrders();
    }

    // Get order by ORDER_ID
    @GetMapping("/{orderId}")
    public ResponseEntity<CustomerOrder> getOrderById(
            @PathVariable String orderId) {

        return service.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add new customer order
    @PostMapping
    public CustomerOrder addOrder(
            @RequestBody CustomerOrder customerOrder) {

        return service.addOrder(customerOrder);
    }

    // Update customer order
    @PutMapping("/{orderId}")
    public CustomerOrder updateOrder(
            @PathVariable String orderId,
            @RequestBody CustomerOrder customerOrder) {

        return service.updateOrder(orderId, customerOrder);
    }

    // Delete customer order
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(
            @PathVariable String orderId) {

        service.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}