package com.app.jobTS.sign.job.dto.task;

import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.entity.Sprint;
import com.app.jobTS.sign.job.model.SprintStatus;

import java.time.LocalDateTime;

public class TaskSprintDto extends BaseEntity {

    private Long id;

    private Long projectId;

    private String name;

    private LocalDateTime startDate;

    private String sprintCode;

    private String description;

    private LocalDateTime endDate;

    private SprintStatus status;

    public TaskSprintDto() {}

    public TaskSprintDto(Sprint sprint) {
        this.id = sprint.getId();
        this.name = sprint.getName();
        this.sprintCode = sprint.getSprintCode();
        this.description = sprint.getDescription();
        this.startDate = sprint.getStartDate();
        this.endDate = sprint.getEndDate();
        this.status = sprint.getStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public String getSprintCode() {
        return sprintCode;
    }

    public void setSprintCode(String sprintCode) {
        this.sprintCode = sprintCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public SprintStatus getStatus() {
        return status;
    }

    public void setStatus(SprintStatus status) {
        this.status = status;
    }
}
