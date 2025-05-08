package com.app.jobTS.sign.job.entity;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "task_id", referencedColumnName = "id", nullable = false)
    private Task task;

    @Transient
    private Long taskId;

    public Comment() {

    }
    public Comment(Long id, String comment, User user, Date createdDate, Task task, Long taskId) {
        this.id = id;
        this.comment = comment;
        this.user = user;
        this.task = task;
        this.taskId = taskId;
    }

    public Comment(CommentDto dto) {
        this.id = dto.getId();
        this.comment = dto.getComment();
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}