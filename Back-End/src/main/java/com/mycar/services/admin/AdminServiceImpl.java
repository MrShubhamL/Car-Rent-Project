package com.mycar.services.admin;

import com.mycar.dtos.CarDto;
import com.mycar.entites.Cars;
import com.mycar.repositores.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final CarRepository carRepository;

    @Override
    public boolean postCard(CarDto carDto) {
        try{
            Cars cars = new Cars();
            cars.setName(carDto.getName());
            cars.setColor(carDto.getColor());
            cars.setBrand(carDto.getBrand());
            cars.setTransmission(carDto.getTransmission());
            cars.setPrice(carDto.getPrice());
            cars.setType(carDto.getType());
            cars.setModelYear(carDto.getModelYear());
            cars.setDescription(carDto.getDescription());
            cars.setImage(carDto.getImage().getBytes());
            carRepository.save(cars);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Cars::getCarDto).collect(Collectors.toList());
    }
}
