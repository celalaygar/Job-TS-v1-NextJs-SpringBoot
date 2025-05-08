package com.app.jobTS.sign.job.repository;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.job.entity.Backlog;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.entity.Sprint;
import com.app.jobTS.sign.job.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProject(Project project);
    List<Task> findByProjectAndBacklog(Project project, Backlog backlog);
    List<Task> findByProjectAndSprint(Project project, Sprint sprint);
    List<Task> findByProjectAndUser(Project project, User user);

}