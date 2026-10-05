package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.CustomerOrder;
import com.foundry.foundry_management.repository.CustomerOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerOrderService {

    private final CustomerOrderRepository repository;

    public CustomerOrderService(CustomerOrderRepository repository) {
        this.repository = repository;
    }

    // Get all customer orders
    public List<CustomerOrder> getAllOrders() {
        return repository.findAll();
    }

    // Get order by ORDER_ID
    public Optional<CustomerOrder> getOrderById(String orderId) {
        return repository.findById(orderId);
    }

    // Add new customer order
    public CustomerOrder addOrder(CustomerOrder customerOrder) {
        return repository.save(customerOrder);
    }

    // Update customer order
    public CustomerOrder updateOrder(
            String orderId,
            CustomerOrder customerOrder) {

        customerOrder.setOrderId(orderId);
        return repository.save(customerOrder);
    }

    // Delete customer order
    public void deleteOrder(String orderId) {
        repository.deleteById(orderId);
    }
}