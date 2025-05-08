package com.app.jobTS.sign.job.repository;

import com.app.jobTS.sign.job.entity.Backlog;
import com.app.jobTS.sign.job.entity.Comment;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.entity.Sprint;
import com.app.jobTS.sign.job.model.SprintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BacklogRepository extends JpaRepository<Backlog, Long> {

    Optional<Backlog> findByProject(Project project);
}