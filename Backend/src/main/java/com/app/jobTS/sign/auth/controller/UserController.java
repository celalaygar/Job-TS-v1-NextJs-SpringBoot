package com.app.jobTS.sign.auth.controller;

import com.app.jobTS.sign.auth.dto.ResetPasswordRequestDto;
import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.auth.dto.UserUpdateDto;
import com.app.jobTS.sign.auth.service.UserService;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> findAll() {
        List<UserDto> response = userService.findAll();
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-me")
    public ResponseEntity<BaseResponse<UserDto>> updateMe(
            @RequestBody UserUpdateDto request) {
        return ResponseEntity.ok(userService.updateMe(request));
    }

    @PostMapping("/change-myPassword")
    public ResponseEntity<BaseResponse<Boolean>> changePassword(
            @RequestBody ResetPasswordRequestDto request) {
        return ResponseEntity.ok(userService.changePassword(request));
    }
}