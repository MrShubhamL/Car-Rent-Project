package com.mycar.controllers;

import com.mycar.dtos.AuthenticationRequest;
import com.mycar.dtos.AuthenticationResponse;
import com.mycar.dtos.SignUpRequest;
import com.mycar.dtos.UserDto;
import com.mycar.entites.Customer;
import com.mycar.enums.UserRole;
import com.mycar.repositores.UserRepository;
import com.mycar.services.AuthService;
import com.mycar.services.jwt.CustomerServiceImpl;
import com.mycar.utils.JwtUtils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final CustomerServiceImpl customerService;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;


    @PostConstruct
    public void createAdmin(){
        Customer adminAccount = userRepository.findByRole(UserRole.ADMIN);
        if(adminAccount == null){
            Customer admin = new Customer();
            admin.setName("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setRole(UserRole.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin123"));
            userRepository.save(admin);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createCustomer(@RequestBody SignUpRequest signUpRequest){
        if(authService.hasCustomerWithEmail(signUpRequest.getEmail()))
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email already exist. Try again with another email.");
        UserDto createdUserDto = authService.createCustomer(signUpRequest);
        if(createdUserDto == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request!");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserDto);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e){
            throw new BadCredentialsException("Incorrect Username or Password.");
        }
        final UserDetails userDetails = customerService.loadUserByUsername(authenticationRequest.getEmail());
        Optional<Customer> optionalCustomer = userRepository.getUserByEmail(userDetails.getUsername());
        final String jwt = jwtUtils.generateToken(userDetails.getUsername());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if(optionalCustomer.isPresent()){
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserRole(optionalCustomer.get().getRole());
            authenticationResponse.setUserId(optionalCustomer.get().getId());
        }
        return authenticationResponse;
    }

}
