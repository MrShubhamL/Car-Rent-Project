package com.mycar.controllers;

import com.mycar.dtos.CarDto;
import com.mycar.entites.Cars;
import com.mycar.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard/admin")
public class AdminController {
    private final AdminService adminService;
    @PostMapping("/car")
    public ResponseEntity<?> postCar(@ModelAttribute CarDto carDto){
        Cars cars = new Cars();

        boolean saveCar = adminService.postCard(carDto);
        if(saveCar){
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    @GetMapping("/allCars")
    public ResponseEntity<List<CarDto>> getAllCars(){
        List<CarDto> allCars = adminService.getAllCars();
        return ResponseEntity.ok(allCars);
    }
}
