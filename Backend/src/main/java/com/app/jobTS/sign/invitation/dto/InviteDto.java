package com.app.jobTS.sign.invitation.dto;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.invitation.model.Invite;
import com.app.jobTS.sign.invitation.model.InviteStatus;
import com.app.jobTS.sign.job.entity.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

public class InviteDto extends BaseEntity {

    private Long id;

    private InviteProjectDto project;  // Davet edilen proje

    private InviteStatus status = InviteStatus.PENDING; // Default olarak beklemede

    private InviteUserDto invitingUser;

    private InviteUserDto invitedUser;  // Davet edilen kullanıcı

    public InviteDto() {
    }

    public InviteDto(Invite invite) {
        this.id = invite.getId();
        this.project = new InviteProjectDto(invite.getProject());
        this.status = invite.getStatus();
        this.invitingUser = new InviteUserDto(invite.getInvitingUser());
        this.invitedUser = new InviteUserDto(invite.getInvitedUser());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public InviteProjectDto getProject() {
        return project;
    }

    public void setProject(InviteProjectDto project) {
        this.project = project;
    }

    public InviteStatus getStatus() {
        return status;
    }

    public void setStatus(InviteStatus status) {
        this.status = status;
    }

    public InviteUserDto getInvitingUser() {
        return invitingUser;
    }

    public void setInvitingUser(InviteUserDto invitingUser) {
        this.invitingUser = invitingUser;
    }

    public InviteUserDto getInvitedUser() {
        return invitedUser;
    }

    public void setInvitedUser(InviteUserDto invitedUser) {
        this.invitedUser = invitedUser;
    }
}