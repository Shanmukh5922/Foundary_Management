package com.foundry.foundry_management.repository;

import com.foundry.foundry_management.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, String> {

}