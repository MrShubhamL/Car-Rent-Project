package com.mycar.services;

import com.mycar.dtos.CarDto;
import com.mycar.dtos.SignUpRequest;
import com.mycar.dtos.UserDto;

import java.util.List;

public interface AuthService {
    UserDto createCustomer(SignUpRequest request);
    boolean hasCustomerWithEmail(String email);

}
