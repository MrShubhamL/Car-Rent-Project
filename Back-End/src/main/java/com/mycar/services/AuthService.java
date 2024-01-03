package com.mycar.services;

import com.mycar.dtos.SignUpRequest;
import com.mycar.dtos.UserDto;

public interface AuthService {
    UserDto createCustomer(SignUpRequest request);
    boolean hasCustomerWithEmail(String email);
}
