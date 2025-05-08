package com.app.jobTS.sign.job.repository;

import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.entity.Sprint;
import com.app.jobTS.sign.job.entity.SprintTriggerCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SprintTriggerCodeRepository extends JpaRepository<SprintTriggerCode, Long> {

    Optional<SprintTriggerCode>  findByProject(Project project);
}