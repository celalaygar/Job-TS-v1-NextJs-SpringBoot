package com.app.jobTS.sign.auth.controller;

import com.app.jobTS.sign.auth.dto.LoginRequest;
import com.app.jobTS.sign.auth.dto.RegisterRequest;
import com.app.jobTS.sign.auth.dto.UserResponse;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.auth.repository.UserRepository;
import com.app.jobTS.sign.auth.security.JwtProvider;
import com.app.jobTS.sign.auth.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private JwtProvider provider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        try {
            logger.info("AuthController register request");
            logger.info(request.getEmail() + " "+ request.getPassword());
            User user = userService.register(request);
            logger.info("AuthController login response");
            logger.info(user.getId() + " "+user.getEmail() + " "+ user.getPassword());
            user.setPremium(null);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.info("AuthController register error");
            logger.info(e.getMessage());
            logger.info(e.getMessage());
            System.out.println(e.getCause());
            System.out.println(e.getMessage());
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest request) {
        try {

            logger.info("AuthController login request " + new Date());
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()));

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

            // Generate token (assuming you have a method in JwtProvider to generate token)
            String token = provider.generateToken(request.getEmail());
            Optional<User> user = userRepository.findByEmail(request.getEmail());

            // Return user response with token
            logger.info("AuthController login response " + new Date());
            return ResponseEntity.ok(new UserResponse(token, user.get()));
        } catch (Exception e) {
            logger.info("AuthController login error " + new Date());
            System.out.println(e.getCause());
            System.out.println(e.getMessage());
            throw e;
        }
    }
}