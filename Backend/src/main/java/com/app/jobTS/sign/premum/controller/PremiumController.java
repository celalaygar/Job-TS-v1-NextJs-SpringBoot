package com.app.jobTS.sign.premum.controller;

import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.premum.dto.PremiumDto;
import com.app.jobTS.sign.premum.service.PremiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/premium")
public class PremiumController {

    @Autowired
    PremiumService premiumService;

    @PostMapping("/{userId}")
    public ResponseEntity<UserDto> createStandartPremium(@PathVariable Long userId) throws Exception {
        UserDto response = premiumService.createStandartPremium(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<PremiumDto> getPremiumByUserId(@PathVariable Long userId) throws Exception {
        PremiumDto response = premiumService.getPremiumByUserId(userId);
        return ResponseEntity.ok(response);
    }

}
