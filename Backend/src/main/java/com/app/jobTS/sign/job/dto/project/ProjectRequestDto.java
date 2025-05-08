package com.app.jobTS.sign.job.dto.project;

import com.app.jobTS.sign.job.entity.Project;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectRequestDto {

    private Long projectId;

    private String name;

    private String description;

    private String projectCode;

    private Date createdAt;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}