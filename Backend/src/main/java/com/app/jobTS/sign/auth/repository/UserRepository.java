package com.app.jobTS.sign.auth.repository;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.job.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    List<User> findByParticipatedProjectsNotContaining(Project project);


}