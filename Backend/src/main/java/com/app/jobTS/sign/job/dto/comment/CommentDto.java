package com.app.jobTS.sign.job.dto.comment;

import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.entity.Comment;
import com.app.jobTS.sign.job.entity.Task;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

public class CommentDto extends BaseEntity {

    private Long id;

    private String comment;

    private Date createdAt;

    private CommentUserDto user;

    private Long taskId;
    public CommentDto() {

    }
    public CommentDto(Comment comment) {
        this.id = comment.getId();
        this.comment = comment.getComment();
        this.createdAt = comment.getCreatedAt();
        this.taskId = comment.getId();
        this.user = new CommentUserDto(comment.getUser());
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

    @Override
    public Date getCreatedAt() {
        return createdAt;
    }

    @Override
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public CommentUserDto getUser() {
        return user;
    }

    public void setUser(CommentUserDto user) {
        this.user = user;
    }
}