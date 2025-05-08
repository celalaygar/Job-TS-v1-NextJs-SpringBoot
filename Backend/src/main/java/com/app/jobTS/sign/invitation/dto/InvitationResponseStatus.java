package com.app.jobTS.sign.invitation.dto;


public enum InvitationResponseStatus {
    CHANGED_STATUS(0, "CHANGED STATUS"),
    PENDING(0, "PENDING"),
    NOT_PENDING(0, "NOT PENDING"),
    NOT_FOUND(0, "NOT FOUND"),
    PLANNED(1, "PLANNED"),
    NOT_PLANNED(2, "NOT PLANNED"),
    ACTIVE(2, "ACTIVE"),
    NOT_ACTIVE(3, "NOT ACTIVE"),
    NOT_COMPLETED(4, "NOT COMPLETED"),
    COMPLETED(5, "COMPLETED"),
    OK(5, "OK"),;

    private final int id;
    private final String description;

    InvitationResponseStatus(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public static InvitationResponseStatus fromId(int id) {
        for (InvitationResponseStatus sprintResponseStatus : values()) {
            if (sprintResponseStatus.getId() == id) {
                return sprintResponseStatus;
            }
        }
        throw new IllegalArgumentException("Geçersiz SprintStatus ID: " + id);
    }
}
