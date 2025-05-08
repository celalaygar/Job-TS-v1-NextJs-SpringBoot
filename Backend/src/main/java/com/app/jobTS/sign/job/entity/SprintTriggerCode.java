package com.app.jobTS.sign.job.entity;

import com.app.jobTS.sign.base.model.BaseEntity;
import jakarta.persistence.*;

@Entity
public class SprintTriggerCode extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer currentCode;

    @OneToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCurrentCode() {
        return currentCode;
    }

    public void setCurrentCode(Integer currentCode) {
        this.currentCode = currentCode;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
