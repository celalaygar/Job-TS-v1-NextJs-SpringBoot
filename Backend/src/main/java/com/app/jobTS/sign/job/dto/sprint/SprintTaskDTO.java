package com.app.jobTS.sign.job.dto.sprint;

import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.dto.task.TaskBacklogDto;
import com.app.jobTS.sign.job.dto.task.TaskProjectDto;
import com.app.jobTS.sign.job.dto.task.TaskSprintDto;
import com.app.jobTS.sign.job.dto.task.TaskUserDto;
import com.app.jobTS.sign.job.entity.Task;
import com.app.jobTS.sign.job.model.Priority;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.model.TaskType;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class SprintTaskDTO {

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
    private Long projectId;
    private TaskUserDto user;


    public SprintTaskDTO() {
    }

    public SprintTaskDTO(Task task) {
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
            this.projectId = task.getProject().getId();
        }
        if(task.getUser() != null){
            this.user = new TaskUserDto(task.getUser());
        }

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

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public TaskUserDto getUser() {
        return user;
    }

    public void setUser(TaskUserDto user) {
        this.user = user;
    }
}
