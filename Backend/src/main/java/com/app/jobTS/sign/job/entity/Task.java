package com.app.jobTS.sign.job.entity;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.dto.task.CreateTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskRequestDTO;
import com.app.jobTS.sign.job.model.Priority;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.model.TaskType;
import jakarta.persistence.*;

import java.util.List;
import java.util.stream.Collectors;

@Entity
public class Task extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String taskNumber;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String assigned;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Priority priority;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private TaskStatus status;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private TaskType type;

    @ManyToOne
    @JoinColumn(name = "projectId", referencedColumnName = "id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Transient
    private Long projectId;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;

    @ManyToOne
    @JoinColumn(name = "backlog_id")
    private Backlog backlog;

    public Task() {
    }

    public Task(TaskDTO task) {
        this.id = task.getId();
        this.taskNumber = task.getTaskNumber();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.assigned = task.getAssigned();
        this.setCreatedAt(task.getCreatedAt());
        this.setUpdatedAt(task.getUpdatedAt());
        this.priority = task.getPriority();
        this.status = task.getStatus();
        this.type = task.getType();
        if(task.getProject() != null){
            this.project = new Project(task.getProject());
        }
        this.projectId = task.getProjectId();
        if(task.getComments() != null){
            this.comments = task.getComments().stream().map(item -> new Comment(item))
                    .collect(Collectors.toList());
        }
    }
    public Task(TaskRequestDTO dto) {
        this.id = dto.getId();
        this.taskNumber = dto.getTaskNumber();
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.assigned = dto.getAssigned();
        this.setCreatedAt(dto.getCreatedAt());
        this.setUpdatedAt(dto.getUpdatedAt());
        this.priority = dto.getPriority();
        this.status = dto.getStatus();
        this.type = dto.getType();
        this.projectId = dto.getProjectId();
        this.comments = dto.getComments();
    }
    public Task(CreateTaskDTO dto) {
        this.id = dto.getId();
        this.taskNumber = dto.getTaskNumber();
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.assigned = dto.getAssigned();
        this.setCreatedAt(dto.getCreatedAt());
        this.setUpdatedAt(dto.getUpdatedAt());
        this.priority = dto.getPriority();
        this.status = dto.getStatus();
        this.type = dto.getType();
        this.projectId = dto.getProjectId();
        if(dto.getComments() != null){
            this.comments = dto.getComments().stream().map(item -> new Comment(item))
                    .collect(Collectors.toList());
        }
    }

    public Task(Task task, TaskRequestDTO dto) {
        this.setId(task.getId());
        if(task.getCreatedBy() != null){
            this.setCreatedBy(task.getCreatedBy());
        }
        if(task.getUpdatedBy() != null){
            this.setUpdatedBy(task.getUpdatedBy());
        }
        if(task.getProject() != null){
            this.projectId = task.getProject().getId();
        }
        this.sprint = task.getSprint();
        this.comments = task.getComments();
        this.backlog = task.getBacklog();
        this.setProject(task.getProject());
        this.taskNumber = task.getTaskNumber();
        this.setCreatedAt(task.getCreatedAt());
        this.setUpdatedAt(task.getUpdatedAt());

        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.assigned = dto.getAssigned();
        this.status = dto.getStatus();
        this.priority = dto.getPriority();
        this.type = dto.getType();


    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Backlog getBacklog() {
        return backlog;
    }

    public void setBacklog(Backlog backlog) {
        this.backlog = backlog;
    }
}