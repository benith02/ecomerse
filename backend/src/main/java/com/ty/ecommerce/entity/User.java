package com.ty.ecommerce.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable=false)
    private String username;

    @Column(nullable=false)
    private String password;

//    @OneToMany(mappedBy = "user")
//    private List<Order> orders;

}
