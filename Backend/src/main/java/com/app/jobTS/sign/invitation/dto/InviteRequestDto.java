package com.app.jobTS.sign.invitation.dto;

import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.invitation.model.Invite;
import com.app.jobTS.sign.invitation.model.InviteStatus;

public class InviteRequestDto extends BaseEntity {

    private Long inviteId;

    private InviteProjectDto project;  // Davet edilen proje

    private InviteStatus status; // Default olarak beklemede


    public Long getInviteId() {
        return inviteId;
    }

    public void setInviteId(Long inviteId) {
        this.inviteId = inviteId;
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
}