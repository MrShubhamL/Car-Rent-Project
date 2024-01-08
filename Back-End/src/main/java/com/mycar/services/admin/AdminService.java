package com.mycar.services.admin;

import com.mycar.dtos.CarDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminService {
    boolean postCard(CarDto carDto);
    List<CarDto> getAllCars();
}
