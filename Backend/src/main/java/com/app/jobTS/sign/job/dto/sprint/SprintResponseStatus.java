package com.app.jobTS.sign.job.dto.sprint;


public enum SprintResponseStatus {
    CHANGED_STATUS(0, "CHANGED STATUS"),
    NOT_FOUND(0, "NOT FOUND"),
    PLANNED(1, "PLANNED"),
    NOT_PLANNED(2, "NOT PLANNED"),
    ACTIVE(2, "ACTIVE"),
    NOT_ACTIVE(3, "NOT ACTIVE"),
    NOT_COMPLETED(4, "NOT COMPLETED"),
    COMPLETED(5, "COMPLETED"),
    OK(5, "OK"),
    CONFLICT_PROJECT(4, "CONFLICT PROJECT");

    private final int id;
    private final String description;

    SprintResponseStatus(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public static SprintResponseStatus fromId(int id) {
        for (SprintResponseStatus sprintResponseStatus : values()) {
            if (sprintResponseStatus.getId() == id) {
                return sprintResponseStatus;
            }
        }
        throw new IllegalArgumentException("Geçersiz SprintStatus ID: " + id);
    }
}
