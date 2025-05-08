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
public class TasksController {

    @Autowired
    private JobService jobService;

    // Task Endpoints
    @PostMapping("/tasks")
    public ResponseEntity<TaskDTO> createTask(@RequestBody CreateTaskDTO task) {
        return ResponseEntity.ok(jobService.createTask(task));
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getTaskDetailById(id));
    }

    @PostMapping("/tasks/my-tasks")
    public ResponseEntity<BaseResponse<List<TaskDTO>>> getMyTaskByProjectId(@RequestBody TaskRequestDTO dto) {
        return ResponseEntity.ok(jobService.getMyTaskByProjectId(dto));
    }

    @GetMapping("/tasks/project/{projectId}")
    public ResponseEntity<List<TaskDTO>> getTaskByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(jobService.getTaskByProjectId(projectId));
    }
    @PostMapping("/tasks/active-sprint")
    public ResponseEntity<List<TaskDTO>> getTaskByProjectIdAndActiveSprint(@RequestBody TaskRequestDTO dto) {
        return ResponseEntity.ok(jobService.getTaskByProjectIdAndActiveSprint(dto));
    }


    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(jobService.getAllTasks());
    }

    @PatchMapping("/tasks/{id}")
    public ResponseEntity<TaskDTO> updateTaskStatus(@PathVariable Long id, @RequestBody Task task) {
        return ResponseEntity.ok(jobService.updateTaskStatus(id, task));
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody TaskRequestDTO task) throws Exception {
        return ResponseEntity.ok(jobService.updateTask(id, task));
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        jobService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

}