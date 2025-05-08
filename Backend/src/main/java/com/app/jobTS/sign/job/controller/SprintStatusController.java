package com.app.jobTS.sign.job.controller;


import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.job.dto.sprint.SprintDto;
import com.app.jobTS.sign.job.dto.sprint.SprintResponseStatus;
import com.app.jobTS.sign.job.model.SprintStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sprints/statuses")
public class SprintStatusController {

    @GetMapping("/all")
    public BaseResponse<List<Map<String, Object>>> getAllSprintStatuses() {
        List<Map<String, Object>> statuses = new ArrayList<>();

        for (SprintStatus status : SprintStatus.values()) {
            Map<String, Object> statusMap = new HashMap<>();
            statusMap.put("id", status.getId());
            statusMap.put("name", status.name());
            statusMap.put("description", status.getDescription());
            statuses.add(statusMap);
        }
        return new BaseResponse<List<Map<String, Object>>>(true, HttpStatus.OK, statuses,
                SprintResponseStatus.OK.name(),"Sprint Status ok");
    }
}
