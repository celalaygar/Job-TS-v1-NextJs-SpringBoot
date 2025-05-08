package com.app.jobTS.sign.job.repository;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.job.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Belirli bir kullanıcının katıldığı projeleri getirir
    List<Project> findByParticipatingUsers(User user);

    @Query("SELECT p FROM Project p JOIN p.participatingUsers u WHERE u.id = :userId")
    List<Project> findProjectsByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM project p " +
            "JOIN project_users pu ON p.id = pu.project_id " +
            "WHERE pu.user_id = :userId",
            nativeQuery = true)
    List<Project> findProjectsByUserIdNative(@Param("userId") Long userId);
}