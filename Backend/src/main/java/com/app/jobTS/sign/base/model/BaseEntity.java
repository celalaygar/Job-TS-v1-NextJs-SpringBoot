package com.app.jobTS.sign.base.model;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.premum.model.Premium;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@MappedSuperclass
public abstract class BaseEntity {

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;


    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne(cascade = CascadeType.ALL) // Cascade ile otomatik kaydetme/silme
    @JoinColumn(name = "created_by", referencedColumnName = "id") // Foreign key
    private User createdBy;

    @ManyToOne(cascade = CascadeType.ALL) // Cascade ile otomatik kaydetme/silme
    @JoinColumn(name = "updated_by", referencedColumnName = "id") // Foreign key
    private User updatedBy;



    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(User updatedBy) {
        this.updatedBy = updatedBy;
    }

}