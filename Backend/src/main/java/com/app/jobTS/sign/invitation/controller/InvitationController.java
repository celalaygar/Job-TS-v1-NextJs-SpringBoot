package com.app.jobTS.sign.invitation.controller;

import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.invitation.dto.InviteDto;
import com.app.jobTS.sign.invitation.dto.InviteRequestDto;
import com.app.jobTS.sign.invitation.dto.SendRequestDto;
import com.app.jobTS.sign.invitation.dto.SendResponseDto;
import com.app.jobTS.sign.invitation.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invitation")
public class InvitationController {

    @Autowired
    private InviteService inviteService;

    @PostMapping("/send")
    public ResponseEntity<SendResponseDto> sendInvite(@RequestBody SendRequestDto requestDto) {
        return ResponseEntity.ok(inviteService.sendInvite(requestDto));
    }

    @GetMapping("/user/pendingInvites")
    public ResponseEntity<BaseResponse<List<InviteDto>>> getUserInvites() {
        return ResponseEntity.ok(inviteService.getUserPendingInvites());
    }

    @PostMapping("/accept")
    public ResponseEntity<BaseResponse<Boolean>> acceptInvite(@RequestBody InviteRequestDto dto) {
        return ResponseEntity.ok(inviteService.acceptInvite(dto));
    }

    @PostMapping("/decline")
    public ResponseEntity<BaseResponse<Boolean>> declineInvite(@RequestBody InviteRequestDto dto) {
        return ResponseEntity.ok(inviteService.declineInvite(dto));
    }
}