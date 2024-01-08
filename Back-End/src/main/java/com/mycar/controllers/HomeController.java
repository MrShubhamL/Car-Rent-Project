package com.mycar.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard/customer")
public class HomeController {
    @GetMapping("/home")
    public String apiTest(){
        return "You are successfully logging and accessing the authorized page.";
    }
}
