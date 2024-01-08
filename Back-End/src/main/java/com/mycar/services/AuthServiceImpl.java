package com.mycar.services;

import com.mycar.dtos.CarDto;
import com.mycar.dtos.SignUpRequest;
import com.mycar.dtos.UserDto;
import com.mycar.entites.Cars;
import com.mycar.entites.Customer;
import com.mycar.enums.UserRole;
import com.mycar.repositores.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;

    @Override
    public UserDto createCustomer(SignUpRequest signUpRequest) {
        Customer customer = new Customer();
        customer.setName(signUpRequest.getName());
        customer.setEmail(signUpRequest.getEmail());
        String hashPassword = new BCryptPasswordEncoder().encode(signUpRequest.getPassword());
        customer.setPassword(hashPassword);
        customer.setRole(UserRole.CUSTOMER);
        Customer createdCustomer = userRepository.save(customer);

        UserDto createdUserDto = new UserDto();
        createdUserDto.setId(createdCustomer.getId());
        createdUserDto.setName(createdCustomer.getName());
        createdUserDto.setEmail(createdCustomer.getEmail());
        createdUserDto.setPassword(createdCustomer.getPassword());
        return createdUserDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.getUserByEmail(email).isPresent();
    }

}
