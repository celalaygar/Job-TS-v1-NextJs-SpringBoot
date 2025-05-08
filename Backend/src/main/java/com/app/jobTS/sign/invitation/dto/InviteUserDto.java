package com.app.jobTS.sign.invitation.dto;

import com.app.jobTS.sign.auth.model.Role;
import com.app.jobTS.sign.auth.model.User;

import java.util.Date;

public class InviteUserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String birthcity;
    private Date birthdate;
    private Role role;


    public InviteUserDto() {

    }

    public InviteUserDto(User user) {
        this.id = user.getId();
        this.firstname = user.getFirstname();
        this.lastname =  user.getLastname();
        this.email =  user.getEmail();
        this.birthcity =  user.getBirthcity();
        this.birthdate =  user.getBirthdate();
        this.role = user.getRole();
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

    public String getBirthcity() {
        return birthcity;
    }

    public void setBirthcity(String birthcity) {
        this.birthcity = birthcity;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}