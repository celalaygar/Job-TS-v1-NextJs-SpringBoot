package com.app.jobTS.sign.job.controller;

import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.dto.project.ProjectDto;
import com.app.jobTS.sign.job.dto.project.ProjectRequestDto;
import com.app.jobTS.sign.job.dto.project.ProjectUserDto;
import com.app.jobTS.sign.job.dto.task.CreateTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskRequestDTO;
import com.app.jobTS.sign.job.entity.Comment;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.entity.Task;
import com.app.jobTS.sign.job.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    // Project Endpoints
    @PostMapping("/projects")
    public ResponseEntity<ProjectDto> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(jobService.createProject(project));
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getProjectById(id));
    }

    @PostMapping("/projects/users")
    public ResponseEntity<List<ProjectUserDto>> getUsersByProjectId(@RequestBody ProjectRequestDto dto) {
        return ResponseEntity.ok(jobService.getUsersByProjectId(dto));
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(jobService.getAllProjects());
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable Long id, @RequestBody Project project) {
        return ResponseEntity.ok(jobService.updateProject(id, project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        jobService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/projects/{id}/getUsersNotContainingProject")
    public ResponseEntity<List<ProjectUserDto>> getUsersNotContainingProject(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getUsersNotContainingProject(id));
    }

}