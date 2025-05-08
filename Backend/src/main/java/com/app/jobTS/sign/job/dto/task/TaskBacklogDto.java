package com.app.jobTS.sign.job.dto.task;

import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.entity.Backlog;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.entity.Task;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

public class TaskBacklogDto extends BaseEntity {

    private Long id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    public TaskBacklogDto() {}

    public TaskBacklogDto(Backlog backlog) {
        this.id = backlog.getId();
        this.startDate = backlog.getStartDate();
        this.endDate = backlog.getEndDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
}
