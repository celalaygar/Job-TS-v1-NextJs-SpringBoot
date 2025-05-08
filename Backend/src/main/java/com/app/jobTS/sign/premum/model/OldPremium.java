package com.app.jobTS.sign.premum.model;

import com.app.jobTS.sign.auth.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "old-premium") // Specify the table name
public class OldPremium implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name="premium-type", nullable = false)
    private PremiumType premiumType;

    @NotNull
    private Date startDate;

    @NotNull
    private Date endDate;


    public OldPremium() {

    }

    public OldPremium(Premium premium) {
        this.user = premium.getUser();
        this.premiumType = premium.getPremiumType();
        this.startDate = premium.getStartDate();
        this.endDate = premium.getEndDate();
    }

    public OldPremium(Long id, User user, PremiumType premiumType, @NotNull Date startDate, @NotNull Date endDate) {
        this.id = id;
        this.user = user;
        this.premiumType = premiumType;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PremiumType getPremiumType() {
        return premiumType;
    }

    public void setPremiumType(PremiumType premiumType) {
        this.premiumType = premiumType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
