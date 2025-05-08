package com.app.jobTS.sign.auth.service;

import com.app.jobTS.sign.auth.dto.RegisterRequest;
import com.app.jobTS.sign.auth.dto.ResetPasswordRequestDto;
import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.auth.dto.UserUpdateDto;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    User register(RegisterRequest request);
    List<UserDto> findAll();
    User findById(Long id);
    User findUserByAuthentication();
    BaseResponse<UserDto> updateMe(UserUpdateDto request);
    BaseResponse<Boolean> changePassword(ResetPasswordRequestDto request);


}