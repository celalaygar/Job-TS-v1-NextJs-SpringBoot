package com.app.jobTS.sign.invitation.reponsitory;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.invitation.model.Invite;
import com.app.jobTS.sign.invitation.model.InviteStatus;
import com.app.jobTS.sign.job.entity.Backlog;
import com.app.jobTS.sign.job.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InviteRepository extends JpaRepository<Invite, Long> {

    List<Invite> findByInvitedUser(User user);
    List<Invite> findByStatusAndInvitedUser(InviteStatus status, User user);

    // Belirli bir projeye gönderilen tüm davetleri getir
    List<Invite> findByProject(Project project);

    // Kullanıcının belirli bir projeye olan davetini getir
    Optional<Invite> findByInvitedUserAndProject(User user, Project project);

    // Kullanıcının belirli bir projeye olan davetini getir
    Optional<Invite> findByIdAndInvitedUser(Long id, User user);

    // Kullanıcının belirli bir projeye kabul edilmiş davetlerini getir
    List<Invite> findByInvitedUserAndStatus(User user, InviteStatus status);
}