package com.app.jobTS.sign.job.repository;

import com.app.jobTS.sign.job.entity.Sprint;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.model.SprintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SprintRepository extends JpaRepository<Sprint, Long> {
    Optional<Sprint> findByIdAndStatus(Long id, SprintStatus status);
    List<Sprint> findByProject(Project project);
    Optional<Sprint> findByProjectAndStatus(Project project, SprintStatus status);
    List<Sprint> findByProjectAndStatusNot(Project project, SprintStatus status);
}
