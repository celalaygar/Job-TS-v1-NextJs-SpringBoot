package com.app.jobTS.sign.job.controller;

import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.dto.task.CreateTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskRequestDTO;
import com.app.jobTS.sign.job.entity.Comment;
import com.app.jobTS.sign.job.entity.Task;
import com.app.jobTS.sign.job.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class CommentsController {

    @Autowired
    private JobService jobService;

    // Comment Endpoints
    @PostMapping("/comments")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto dto) {
        return ResponseEntity.ok(jobService.createComment(dto));
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getCommentById(id));
    }

    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getAllComments() {
        return ResponseEntity.ok(jobService.getAllComments());
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        return ResponseEntity.ok(jobService.updateComment(id, comment));
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        jobService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}