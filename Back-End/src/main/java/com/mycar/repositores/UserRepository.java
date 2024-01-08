package com.mycar.repositores;

import com.mycar.entites.Customer;
import com.mycar.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> getUserByEmail(String email);
    Customer findByRole(UserRole userRole);
}
