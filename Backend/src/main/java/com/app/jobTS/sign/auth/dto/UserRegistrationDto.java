package com.app.jobTS.sign.auth.dto;

import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Email;

public class UserRegistrationDto {
    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private String birthcity;
    private String birthdate;

    // Getters and Setters
}