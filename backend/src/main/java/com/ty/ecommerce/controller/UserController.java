package com.ty.ecommerce.controller;


import com.ty.ecommerce.dto.LoginRequest;
import com.ty.ecommerce.dto.RegisterRequest;
import com.ty.ecommerce.dto.UserResponse;
import com.ty.ecommerce.entity.User;
import com.ty.ecommerce.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request){
        return userService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        boolean success= userService.login(request);

       return success?"login success":"login failed";
    }
}
