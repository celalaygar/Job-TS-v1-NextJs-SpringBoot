package com.app.jobTS.sign.job.model;


public enum SprintStatus {
    PLANNED(0, "Planlandı"),
    ACTIVE(1, "Devam Ediyor"),
    COMPLETED(2, "Tamamlandı");

    private final int id;
    private final String description;

    SprintStatus(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public static SprintStatus fromId(int id) {
        for (SprintStatus status : values()) {
            if (status.getId() == id) {
                return status;
            }
        }
        throw new IllegalArgumentException("Geçersiz SprintStatus ID: " + id);
    }
}
