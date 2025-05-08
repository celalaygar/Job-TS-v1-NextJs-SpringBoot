package com.app.jobTS.sign.auth.dto;

import com.app.jobTS.sign.auth.model.Role;
import com.app.jobTS.sign.auth.model.User;

import java.time.LocalTime;
import java.util.Date;

public class UserUpdateDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Date birthdate;
    private PremiumDto premium;
    private Role role;

    public UserUpdateDto() {

    }

    public UserUpdateDto(User user) {
        this.id = user.getId();
        this.firstname = user.getFirstname();
        this.lastname =  user.getLastname();
        this.email =  user.getEmail();
        this.birthdate =  user.getBirthdate();
        this.role = user.getRole();
        if(user.getPremium() !=null){
            this.premium = new PremiumDto(user.getPremium());
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public PremiumDto getPremium() {
        return premium;
    }

    public void setPremium(PremiumDto premium) {
        this.premium = premium;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}