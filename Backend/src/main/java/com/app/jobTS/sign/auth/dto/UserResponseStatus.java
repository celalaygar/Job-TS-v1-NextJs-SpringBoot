package com.app.jobTS.sign.auth.dto;


public enum UserResponseStatus {
    CHANGED_STATUS(0, "CHANGED STATUS"),
    NOT_FOUND(1, "NOT FOUND"),
    ACTIVE(3, "ACTIVE"),
    NOT_ACTIVE(4, "NOT ACTIVE"),
    PASSIVE(5, "PASSIVE"),
    NOT_PASSIVE(6, "NOT PASSIVE"),
    OK(7, "Tamamlandı"),
    NOT_MATCHED(8, "NOT MATCHED"),
    CONFLICT_PASSWORD(8, "CONFLICT PASSWORD"),
    CONFLICT_USER(8, "CONFLICT USER");

    private final int id;
    private final String description;

    UserResponseStatus(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public static UserResponseStatus fromId(int id) {
        for (UserResponseStatus sprintResponseStatus : values()) {
            if (sprintResponseStatus.getId() == id) {
                return sprintResponseStatus;
            }
        }
        throw new IllegalArgumentException("Geçersiz SprintStatus ID: " + id);
    }
}
