package com.app.jobTS.sign.job.dto.task;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.entity.*;
import com.app.jobTS.sign.job.model.Priority;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.model.TaskType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class TaskDTO {

    private Long id;
    private String taskNumber;
    private String title;
    private String description;
    private String assigned;
    private Date createdAt;
    private Date updatedAt;
    private Priority priority;
    private TaskStatus status;
    private TaskType type;
    private TaskProjectDto project;
    private Long projectId;
    private List<CommentDto> comments;
    private TaskUserDto user;
    private TaskSprintDto sprint;
    private TaskBacklogDto backlog;


    public TaskDTO() {
    }

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.taskNumber = task.getTaskNumber();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.assigned = task.getAssigned();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
        this.priority = task.getPriority();
        this.status = task.getStatus();
        this.type = task.getType();
        if(task.getProject() != null){
            this.project = new TaskProjectDto(task.getProject());
            this.projectId = task.getProject().getId();
        }
        if(task.getSprint() != null){
            this.sprint = new TaskSprintDto(task.getSprint());
        }
        if(task.getBacklog() != null){
            this.backlog = new TaskBacklogDto(task.getBacklog());
        }
        if(task.getUser() != null){
            this.user = new TaskUserDto(task.getUser());
        }
        if(task.getComments() != null){
            this.comments = task.getComments().stream().map(item -> new CommentDto(item))
                    .collect(Collectors.toList());
        }

    }

    public TaskSprintDto getSprint() {
        return sprint;
    }

    public void setSprint(TaskSprintDto sprint) {
        this.sprint = sprint;
    }

    public TaskBacklogDto getBacklog() {
        return backlog;
    }

    public void setBacklog(TaskBacklogDto backlog) {
        this.backlog = backlog;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskNumber() {
        return taskNumber;
    }

    public void setTaskNumber(String taskNumber) {
        this.taskNumber = taskNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssigned() {
        return assigned;
    }

    public void setAssigned(String assigned) {
        this.assigned = assigned;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public TaskProjectDto getProject() {
        return project;
    }

    public void setProject(TaskProjectDto project) {
        this.project = project;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public List<CommentDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }

    public TaskUserDto getUser() {
        return user;
    }

    public void setUser(TaskUserDto user) {
        this.user = user;
    }
}
