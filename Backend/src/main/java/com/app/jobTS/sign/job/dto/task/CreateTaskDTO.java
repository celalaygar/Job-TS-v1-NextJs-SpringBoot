package com.app.jobTS.sign.job.dto.task;

import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.entity.Task;
import com.app.jobTS.sign.job.model.Priority;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.model.TaskType;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class CreateTaskDTO {

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
    private Boolean addToActiveSprint;
    private Boolean addToBackLog;
    private Boolean assignToMe;
    private Long sprintId;

    public CreateTaskDTO() {
    }

    public CreateTaskDTO(Task task) {
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
        }
        if(task.getUser() != null){
            this.user = new TaskUserDto(task.getUser());
        }
        if(task.getSprint() != null){
            this.sprintId = task.getSprint().getId();
        }
        if(task.getComments() != null){
            this.comments = task.getComments().stream().map(item -> new CommentDto(item))
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

    public Boolean getAddToActiveSprint() {
        return addToActiveSprint;
    }

    public void setAddToActiveSprint(Boolean addToActiveSprint) {
        this.addToActiveSprint = addToActiveSprint;
    }

    public Boolean getAssignToMe() {
        return assignToMe;
    }

    public void setAssignToMe(Boolean assignToMe) {
        this.assignToMe = assignToMe;
    }

    public Long getSprintId() {
        return sprintId;
    }

    public void setSprintId(Long sprintId) {
        this.sprintId = sprintId;
    }

    public Boolean getAddToBackLog() {
        return addToBackLog;
    }

    public void setAddToBackLog(Boolean addToBackLog) {
        this.addToBackLog = addToBackLog;
    }
}
