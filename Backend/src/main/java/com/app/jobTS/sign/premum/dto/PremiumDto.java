package com.app.jobTS.sign.premum.dto;

import com.app.jobTS.sign.premum.model.Premium;
import com.app.jobTS.sign.premum.model.PremiumType;

import java.io.Serializable;
import java.util.Date;

public class PremiumDto implements Serializable {

    private Long id;

    private PremiumType premiumType;

    private Date startDate;

    private Date endDate;

    public PremiumDto(Premium premium) {
        this.id = premium.getId();
        this.premiumType = premium.getPremiumType();
        this.startDate = premium.getStartDate();
        this.endDate = premium.getEndDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
