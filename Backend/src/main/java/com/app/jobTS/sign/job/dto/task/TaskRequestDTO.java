package com.app.jobTS.sign.job.dto.task;

import com.app.jobTS.sign.job.entity.Comment;
import com.app.jobTS.sign.job.entity.Task;
import com.app.jobTS.sign.job.model.Priority;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.model.TaskType;

import java.util.Date;
import java.util.List;

public class TaskRequestDTO {

    private Long id;
    private Long taskId;
    private Long projectId;
    private String taskNumber;
    private String title;
    private String description;
    private String assigned;
    private Date createdAt;
    private Date updatedAt;
    private Priority priority;
    private TaskStatus status;
    private TaskType type;
    private List<Comment> comments;
    private TaskUserDto user;
    private Boolean assignToMe;

    public TaskRequestDTO() {
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
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

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public TaskUserDto getUser() {
        return user;
    }

    public void setUser(TaskUserDto user) {
        this.user = user;
    }

    public Boolean getAssignToMe() {
        return assignToMe;
    }

    public void setAssignToMe(Boolean assignToMe) {
        this.assignToMe = assignToMe;
    }
}
