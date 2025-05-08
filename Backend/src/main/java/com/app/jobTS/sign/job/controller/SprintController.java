package com.app.jobTS.sign.job.controller;

import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.job.dto.sprint.SprintDto;
import com.app.jobTS.sign.job.dto.sprint.SprintRequestDto;
import com.app.jobTS.sign.job.dto.sprint.SprintTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.service.SprintServiceImp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sprints")
public class SprintController {

    private final SprintServiceImp sprintService;

    public SprintController(SprintServiceImp sprintService) {
        this.sprintService = sprintService;
    }

    @PostMapping("/detail")
    public ResponseEntity<BaseResponse> getSprint(@RequestBody SprintRequestDto dto) {
        return ResponseEntity.ok(sprintService.getSprint(dto));
    }

    @PostMapping("/create")
    public ResponseEntity<SprintDto> createSprint( @RequestBody SprintDto dto) {
        return ResponseEntity.ok(sprintService.createSprint( dto));
    }

    @PostMapping("/{sprintId}/start")
    public BaseResponse<SprintDto> startSprint(@PathVariable Long sprintId) {
        return sprintService.startSprint(sprintId);
    }

    @PostMapping("/{sprintId}/complete")
    public BaseResponse completeSprint(@PathVariable Long sprintId) {
        return sprintService.completeSprint(sprintId);
    }

    @PutMapping("/change-status")
    public BaseResponse changeStatus(@RequestBody SprintRequestDto dto) {
        return sprintService.changeStatus(dto);
    }


    @GetMapping("/{projectId}/list")
    public List<SprintDto> getSprintsByProject(@PathVariable Long projectId) {
        return sprintService.getSprintsByProject(projectId);
    }

    @PostMapping("/assignable-sprints")
    public BaseResponse<List<SprintDto>> getAssignableSprintsByProject(@RequestBody SprintRequestDto dto) {
        return sprintService.getAssignableSprintsByProject(dto);
    }

    @PostMapping("/tasks")
    public BaseResponse getTasksBySprint(@RequestBody SprintRequestDto dto) {
        return sprintService.getTasksBySprint(dto);
    }

    @PostMapping("/assign-task")
    public BaseResponse<SprintTaskDTO> assignTaskToSprint(@RequestBody SprintRequestDto dto) {
        return sprintService.assignTaskToSprint(dto);
    }

    @GetMapping("/{sprintId}/tasks")
    public List<TaskDTO> getTasksBySprint(@PathVariable Long sprintId) {
        return sprintService.getTasksBySprint(sprintId);
    }
}
