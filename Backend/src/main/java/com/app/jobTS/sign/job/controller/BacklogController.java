package com.app.jobTS.sign.job.controller;

import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.job.dto.task.CreateTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskRequestDTO;
import com.app.jobTS.sign.job.entity.Task;
import com.app.jobTS.sign.job.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class BacklogController {

    @Autowired
    private JobService jobService;

    @PostMapping("/backlog/tasks")
    public ResponseEntity<BaseResponse<List<TaskDTO>>> getBacklogTaskByProjectId(@RequestBody TaskRequestDTO task) {
        return ResponseEntity.ok(jobService.getBacklogTaskByProjectId(task));
    }


}