package com.app.jobTS.sign.job.service;

import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.base.model.BaseResponse;
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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JobService {

    // Project CRUD
    ProjectDto createProject(Project project);
    ProjectDto getProjectById(Long id);
    List<ProjectUserDto> getUsersNotContainingProject(Long id);
    List<ProjectUserDto> getUsersByProjectId(ProjectRequestDto dto);
    List<ProjectDto> getAllProjects();
    ProjectDto updateProject(Long id, Project project);
    void deleteProject(Long id);

    // Task CRUD
    TaskDTO createTask(CreateTaskDTO task);
    TaskDTO getTaskDetailById(Long id);
    Task getTaskById(Long id);
    List<TaskDTO> getTaskByProjectId(Long id);
    List<TaskDTO> getTaskByProjectIdAndActiveSprint(TaskRequestDTO dto);
    BaseResponse<List<TaskDTO>> getMyTaskByProjectId(TaskRequestDTO dto);

    BaseResponse<List<TaskDTO>> getBacklogTaskByProjectId(TaskRequestDTO task);
    List<TaskDTO> getAllTasks();
    TaskDTO updateTaskStatus(Long id, Task task);
    TaskDTO updateTask(Long id, TaskRequestDTO task) throws Exception;
    void deleteTask(Long id);

    // Comment CRUD
    CommentDto createComment(CommentDto dto);
    Comment getCommentById(Long id);
    List<Comment> getAllComments();
    Comment updateComment(Long id, Comment comment);
    void deleteComment(Long id);

}
