package com.app.jobTS.sign.job.controller;

import com.app.jobTS.sign.job.model.Priority;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.model.TaskType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/enums")
public class EnumController {

    // Priority enum değerlerini döndür
    @GetMapping("/priorities")
    public List<Priority> getPriorities() {
        return Arrays.asList(Priority.values());
    }

    // TaskStatus enum değerlerini döndür
    @GetMapping("/task-statuses")
    public List<TaskStatus> getTaskStatuses() {
        return Arrays.asList(TaskStatus.values());
    }

    // TaskType enum değerlerini döndür
    @GetMapping("/task-types")
    public List<TaskType> getTaskTypes() {
        return Arrays.asList(TaskType.values());
    }
}