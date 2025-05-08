package com.app.jobTS.sign.job.dto.project;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.entity.Task;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectDto {

    private Long id;

    private String name;

    private String description;

    private String projectCode;

    private Date createdAt;

    private List<ProjectTaskDTO> tasks;

    private ProjectUserDto createdBy;
    private List<ProjectUserDto> participatingUsers;

    public ProjectDto(Project project) {
        this.id = project.getId();
        this.name = project.getName();
        this.description = project.getDescription();
        this.projectCode = project.getProjectCode();
        this.createdAt = project.getCreatedAt();
        this.createdBy = new ProjectUserDto(project.getCreatedBy());
        if(project.getTasks() != null){
            this.tasks = project.getTasks().stream().map(item -> new ProjectTaskDTO(item))
                    .collect(Collectors.toList());
        }
        if(project.getParticipatingUsers() != null){
            this.participatingUsers = project.getParticipatingUsers().stream().map(item -> new ProjectUserDto(item))
                    .collect(Collectors.toList());
        }
        if(project.getTasks() != null){
            this.tasks = project.getTasks().stream().map(item -> new ProjectTaskDTO(item))
                    .collect(Collectors.toList());
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<ProjectTaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<ProjectTaskDTO> tasks) {
        this.tasks = tasks;
    }

    public ProjectUserDto getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(ProjectUserDto createdBy) {
        this.createdBy = createdBy;
    }

    public List<ProjectUserDto> getParticipatingUsers() {
        return participatingUsers;
    }

    public void setParticipatingUsers(List<ProjectUserDto> participatingUsers) {
        this.participatingUsers = participatingUsers;
    }
}