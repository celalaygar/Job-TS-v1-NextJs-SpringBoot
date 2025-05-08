package com.app.jobTS.sign.job.entity;

import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.job.dto.sprint.SprintDto;
import com.app.jobTS.sign.job.model.SprintStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Sprint extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private LocalDateTime startDate;

    @Column
    private String sprintCode;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private LocalDateTime endDate;

    @Enumerated(EnumType.ORDINAL)
    private SprintStatus status;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    public Sprint() {}

    public Sprint(String name, Project project) {
        this.name = name;
        this.project = project;
        this.status = SprintStatus.PLANNED;
    }

    public Sprint(SprintDto sprint) {
        this.id = sprint.getId();
        this.name = sprint.getName();
        this.sprintCode = sprint.getSprintCode();
        this.description = sprint.getDescription();
        this.startDate = sprint.getStartDate();
        this.endDate = sprint.getEndDate();
        this.status = sprint.getStatus();
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

    public SprintStatus getStatus() {
        return status;
    }

    public void setStatus(SprintStatus status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public String getSprintCode() {
        return sprintCode;
    }

    public void setSprintCode(String sprintCode) {
        this.sprintCode = sprintCode;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
