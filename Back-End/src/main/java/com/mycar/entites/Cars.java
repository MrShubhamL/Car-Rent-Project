package com.mycar.entites;

import com.mycar.dtos.CarDto;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.Date;

@Entity
@Data
@Table(name = "cars")
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String color;
    private String transmission;
    private String brand;
    private String type;
    private String modelYear;
    private String description;
    private Long price;
    @Column(columnDefinition = "longblob")
    private byte[] image;

    public CarDto getCarDto(){
        CarDto carDto = new CarDto();
        carDto.setId(id);
        carDto.setName(name);
        carDto.setColor(color);
        carDto.setTransmission(transmission);
        carDto.setBrand(brand);
        carDto.setType(type);
        carDto.setModelYear(modelYear);
        carDto.setDescription(description);
        carDto.setPrice(price);
        carDto.setReturnedImage(image);
        return carDto;
    }

}
