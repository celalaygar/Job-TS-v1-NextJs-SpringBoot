package com.app.jobTS.sign.auth.dto;

import com.app.jobTS.sign.auth.model.User;

public class UserResponse {
    private String token;
    private UserDto user;

    public UserResponse(String token, User user) {
        this.token = token;
        this.user = new UserDto(user);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}