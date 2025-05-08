package com.app.jobTS.sign.job.dto.sprint;

import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.entity.Sprint;
import com.app.jobTS.sign.job.model.SprintStatus;

import java.time.LocalDateTime;

public class SprintRequestDto extends BaseEntity {

    private Long id;

    private Long projectId;

    private Long sprintId;

    private Long taskId;

    private String name;

    private LocalDateTime startDate;

    private String sprintCode;

    private String description;

    private LocalDateTime endDate;

    private SprintStatus status;

    private Boolean addToBacklog;

    public SprintRequestDto() {
    }

    public Boolean getAddToBacklog() {
        return addToBacklog;
    }

    public void setAddToBacklog(Boolean addToBacklog) {
        this.addToBacklog = addToBacklog;
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

    public Long getSprintId() {
        return sprintId;
    }

    public void setSprintId(Long sprintId) {
        this.sprintId = sprintId;
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

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
}
