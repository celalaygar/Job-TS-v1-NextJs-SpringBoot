package com.app.jobTS.sign.auth.model;

import com.app.jobTS.sign.invitation.model.Invite;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.premum.model.OldPremium;
import com.app.jobTS.sign.premum.model.Premium;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.CollectionUtils;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "users") // Specify the table name
public class User implements Serializable, UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;

    private String birthcity;

    @Temporal(TemporalType.DATE)
    private Date birthdate;

    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    @OneToMany(mappedBy = "invitedUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Invite> invitedList = new ArrayList<>();

    @OneToMany(mappedBy = "invitingUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Invite> invitingList = new ArrayList<>();

    @Enumerated(EnumType.ORDINAL)
    @Column(name="role", nullable = false)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL) // Cascade ile otomatik kaydetme/silme
    @JoinColumn(name = "premium_id", referencedColumnName = "id") // Foreign key
    private Premium premium;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OldPremium> oldPremiums;

    @ManyToMany(mappedBy = "participatingUsers")
    private List<Project> participatedProjects ;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Premium getPremium() {
        return premium;
    }

    public void setPremium(Premium premium) {
        this.premium = premium;
    }

    public List<OldPremium> getOldPremiums() {
        return oldPremiums;
    }

    public void setOldPremiums(List<OldPremium> oldPremiums) {
        this.oldPremiums = oldPremiums;
    }

    public List<Project> getParticipatedProjects() {
        if (CollectionUtils.isEmpty(participatedProjects)){
            participatedProjects = new ArrayList<>();
        }
        return participatedProjects;
    }

    public void setParticipatedProjects(List<Project> participatedProjects) {
        this.participatedProjects = participatedProjects;
    }

    public List<Invite> getInvitedList() {
        return invitedList;
    }

    public void setInvitedList(List<Invite> invitedList) {
        this.invitedList = invitedList;
    }

    public List<Invite> getInvitingList() {
        return invitingList;
    }

    public void setInvitingList(List<Invite> invitingList) {
        this.invitingList = invitingList;
    }
}
