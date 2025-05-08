package com.app.jobTS.sign.job.entity;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.base.model.BaseEntity;
import com.app.jobTS.sign.invitation.model.Invite;
import com.app.jobTS.sign.job.dto.task.TaskProjectDto;
import jakarta.persistence.*;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String projectCode;

    @ManyToMany
    @JoinTable(
            name = "project_users",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participatingUsers;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Invite> invites = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sprint> sprints;

    @OneToOne(mappedBy = "project")
    private Backlog backlog;

    public Project() {
    }

    public Project(TaskProjectDto project) {
        super();
        this.id = project.getId();
        this.name = project.getName();
        this.description = project.getDescription();
        this.projectCode = project.getProjectCode();
        this.setCreatedAt(project.getCreatedAt());
    }

    public Backlog getBacklog() {
        return backlog;
    }

    public void setBacklog(Backlog backlog) {
        this.backlog = backlog;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public List<User> getParticipatingUsers() {
        if (CollectionUtils.isEmpty(participatingUsers)){
            participatingUsers = new ArrayList<>();
        }
        return participatingUsers;
    }

    public void setParticipatingUsers(List<User> participatingUsers) {
        this.participatingUsers = participatingUsers;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<Invite> getInvites() {
        return invites;
    }

    public void setInvites(List<Invite> invites) {
        this.invites = invites;
    }

    public List<Sprint> getSprints() {
        return sprints;
    }

    public void setSprints(List<Sprint> sprints) {
        this.sprints = sprints;
    }
}
