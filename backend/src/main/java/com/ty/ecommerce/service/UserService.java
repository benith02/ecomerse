package com.ty.ecommerce.service;

import com.ty.ecommerce.dto.LoginRequest;
import com.ty.ecommerce.dto.RegisterRequest;
import com.ty.ecommerce.dto.UserResponse;
import com.ty.ecommerce.entity.User;
import com.ty.ecommerce.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class UserService {

    private final  UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserResponse register(RegisterRequest request){
        User user=new User();
                user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));

        User saved=userRepository.save(user);

        return new UserResponse(saved.getId(),saved.getUsername());

    }
    public boolean login(LoginRequest request){
        User dbUser =userRepository.findByUsername(request.getUsername());
        if(dbUser==null) return false;

        return encoder.matches(request.getPassword(),dbUser.getPassword());
    }
}
