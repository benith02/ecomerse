package com.ty.ecommerce.repository;

import com.ty.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User,Integer>{
    User findByUsername(String username);

}
