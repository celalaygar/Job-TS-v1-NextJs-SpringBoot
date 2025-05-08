package com.app.jobTS.sign.invitation.model;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.entity.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "invites")
public class Invite  extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;  // Davet edilen proje

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private InviteStatus status = InviteStatus.PENDING; // Default olarak beklemede

    @ManyToOne
    @JoinColumn(name = "inviting_user_id",referencedColumnName = "id",  nullable = false)
    private User invitingUser;

    @ManyToOne
    @JoinColumn(name = "invited_user_id",referencedColumnName = "id",  nullable = false)
    private User invitedUser;  // Davet edilen kullanıcı

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public InviteStatus getStatus() {
        return status;
    }

    public void setStatus(InviteStatus status) {
        this.status = status;
    }

    public User getInvitedUser() {
        return invitedUser;
    }

    public void setInvitedUser(User invitedUser) {
        this.invitedUser = invitedUser;
    }

    public User getInvitingUser() {
        return invitingUser;
    }

    public void setInvitingUser(User invitingUser) {
        this.invitingUser = invitingUser;
    }
}