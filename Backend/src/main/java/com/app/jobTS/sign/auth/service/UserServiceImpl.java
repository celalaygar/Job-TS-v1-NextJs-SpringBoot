package com.app.jobTS.sign.auth.service;

import com.app.jobTS.sign.auth.dto.*;
import com.app.jobTS.sign.auth.model.Role;
import com.app.jobTS.sign.auth.repository.UserRepository;
import com.app.jobTS.sign.auth.security.JwtProvider;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.job.dto.sprint.SprintDto;
import com.app.jobTS.sign.job.dto.sprint.SprintResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public User register(RegisterRequest request) {
        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setBirthcity(request.getBirthCity());
        user.setBirthdate(request.getBirthdate());
        user.setRole(Role.USER);
        user = userRepository.save(user);

        return user;
    }



    @Override
    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public String generateToken(UserDetails userDetails) {
        return jwtProvider.generateToken(userDetails.getUsername());
    }
    @Override
    public List<UserDto> findAll() {
        List<User> list = userRepository.findAll();
        List<UserDto> listDto = list.stream().map(user -> new UserDto(user)).collect(Collectors.toList());
        return listDto;
    }


    @Override
    public User findUserByAuthentication(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isEmpty())
            return null;
        return userOpt.get();
    }
    @Override
    public BaseResponse<UserDto> updateMe(UserUpdateDto request){
        User user = findUserByAuthentication();
        user.setBirthdate(request.getBirthdate());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        userRepository.save(user);
        return new BaseResponse<UserDto>(true, HttpStatus.OK,new UserDto(user),
                UserResponseStatus.OK.name(),"User updated");
    }

    @Override
    public BaseResponse<Boolean> changePassword(ResetPasswordRequestDto request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isEmpty()){
            return new BaseResponse<Boolean>(true, HttpStatus.OK,false,
                    UserResponseStatus.NOT_FOUND.name(),"User not found");
        }

        if(!request.getNewPassword().equals(request.getConfirmNewPassword())){
            return new BaseResponse<Boolean>(true, HttpStatus.OK,false,
                    UserResponseStatus.NOT_MATCHED.name(),"Not matched passwords");
        }
        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return new BaseResponse<Boolean>(true, HttpStatus.OK,true,
                UserResponseStatus.OK.name(),"Password changed ");
    }
}