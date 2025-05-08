package com.app.jobTS.sign.invitation.service;

import com.app.jobTS.sign.auth.service.UserService;
import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.invitation.dto.*;
import com.app.jobTS.sign.invitation.model.Invite;
import com.app.jobTS.sign.invitation.model.InviteStatus;
import com.app.jobTS.sign.invitation.reponsitory.InviteRepository;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.auth.repository.UserRepository;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InviteService {

    @Autowired
    private InviteRepository inviteRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private ProjectRepository projectRepository;

    // Yeni davet oluştur
    public SendResponseDto sendInvite(SendRequestDto requestDto) {
        SendResponseDto response = new SendResponseDto();
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectRepository.findById(requestDto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Daha önce aynı projeye davet edilmiş mi kontrol et
        Optional<Invite> existingInvite = inviteRepository.findByInvitedUserAndProject(user, project);
        if (existingInvite.isPresent()) {
            response.setKey("alreadyInvited");
            response.setValue("User already invited to this project");
            return response;
        }



        Invite invite = new Invite();
        invite.setProject(project);
        invite.setCreatedAt(new Date());
        invite.setCreatedBy(userService.findUserByAuthentication());
        invite.setStatus(InviteStatus.PENDING);
        invite.setInvitedUser(user);
        invite.setInvitingUser(userService.findUserByAuthentication());
        inviteRepository.save(invite);

        response.setHttpStatus(HttpStatus.OK);
        response.setKey("userInvıted");
        response.setValue("User invited to this project");
        return response;
    }

    // Kullanıcının tüm davetlerini getir
    public BaseResponse<List<InviteDto>> getUserPendingInvites() {
        User user = userService.findUserByAuthentication();
        List<InviteDto> dtoList = inviteRepository.findByStatusAndInvitedUser(InviteStatus.PENDING, user)
                .stream().map(data -> new InviteDto(data)).collect(Collectors.toList());
        return new BaseResponse<>(true, HttpStatus.OK, dtoList,
                InvitationResponseStatus.OK.name(), "Invitation list as PENDING");
    }

    // Daveti kabul et
    public BaseResponse<Boolean> acceptInvite(InviteRequestDto dto) {
        User user = userService.findUserByAuthentication();
        Optional<Invite> optionalInvite = inviteRepository.findByIdAndInvitedUser(dto.getInviteId(), user);
        if (optionalInvite.isEmpty()) {
            return new BaseResponse<>(true, HttpStatus.OK, true,
                    InvitationResponseStatus.NOT_FOUND.name(), "Invitation NOT FOUND");
        }
        Invite invite = optionalInvite.get();
        if (invite.getStatus() != InviteStatus.PENDING) {
            return new BaseResponse<>(true, HttpStatus.OK, true,
                    InvitationResponseStatus.NOT_PENDING.name(), "Invitation NOT PENDING");
        }
        invite.setStatus(InviteStatus.ACCEPTED);
        Project project = invite.getProject();
        project.getParticipatingUsers().add(user);
        projectRepository.save(project);
        inviteRepository.save(invite);
        return new BaseResponse<>(true, HttpStatus.OK, true,
                InvitationResponseStatus.OK.name(), "Invitation ACCEPTED");
    }

    // Daveti reddet
    public BaseResponse<Boolean> declineInvite(InviteRequestDto dto) {
        User user = userService.findUserByAuthentication();
        Optional<Invite> optionalInvite = inviteRepository.findByIdAndInvitedUser(dto.getInviteId(), user);
        if (optionalInvite.isEmpty()) {
            return new BaseResponse<>(true, HttpStatus.OK, true,
                    InvitationResponseStatus.NOT_FOUND.name(), "Invitation NOT FOUND");
        }
        Invite invite = optionalInvite.get();
        if (invite.getStatus() != InviteStatus.PENDING) {
            return new BaseResponse<>(true, HttpStatus.OK, true,
                    InvitationResponseStatus.NOT_PENDING.name(), "Invitation NOT PENDING");
        }
        invite.setStatus(InviteStatus.DECLINED);
        inviteRepository.save(invite);
        return new BaseResponse<>(true, HttpStatus.OK, true,
                InvitationResponseStatus.OK.name(), "Invitation DECLINED");
    }
}