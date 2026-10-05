package com.foundry.foundry_management.service;

import com.foundry.foundry_management.entity.Operator;
import com.foundry.foundry_management.repository.OperatorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OperatorService {

    private final OperatorRepository repository;

    public OperatorService(OperatorRepository repository) {
        this.repository = repository;
    }

    // Get all operators
    public List<Operator> getAllOperators() {
        return repository.findAll();
    }

    // Get operator by ID
    public Optional<Operator> getOperatorById(String operatorId) {
        return repository.findById(operatorId);
    }

    // Add new operator
    public Operator addOperator(Operator operator) {
        return repository.save(operator);
    }

    // Update operator
    public Operator updateOperator(
            String operatorId,
            Operator operator) {

        operator.setOperatorId(operatorId);
        return repository.save(operator);
    }

    // Delete operator
    public void deleteOperator(String operatorId) {
        repository.deleteById(operatorId);
    }
}