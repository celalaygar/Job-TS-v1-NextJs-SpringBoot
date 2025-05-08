package com.app.jobTS.sign.job.service;

import com.app.jobTS.sign.auth.dto.UserDto;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.auth.repository.UserRepository;
import com.app.jobTS.sign.auth.service.UserService;
import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.constant.JobConstant;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.dto.project.ProjectDto;
import com.app.jobTS.sign.job.dto.project.ProjectRequestDto;
import com.app.jobTS.sign.job.dto.project.ProjectUserDto;
import com.app.jobTS.sign.job.dto.sprint.SprintDto;
import com.app.jobTS.sign.job.dto.sprint.SprintResponseStatus;
import com.app.jobTS.sign.job.dto.task.CreateTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskRequestDTO;
import com.app.jobTS.sign.job.entity.*;
import com.app.jobTS.sign.job.model.SprintStatus;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BacklogServiceImpl backlogService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private SprintRepository sprintRepository;

    // Project CRUD
    @Override
    public ProjectDto createProject(Project project) {
        project.setCreatedAt(new Date());
        User user = userService.findUserByAuthentication();
        project.setCreatedBy(user);
        project.getParticipatingUsers().add(user);
        project = projectRepository.save(project);
        user.getParticipatedProjects().add(project);
        Backlog backlog = new Backlog();
        backlog.setProject(project);
        backlog = backlogService.save(backlog);
        backlog.setProject(project);
        backlog = backlogService.save(backlog);
        userRepository.save(user);
        project.setProjectCode(JobConstant.PROJECT_CODE_PREFIX+project.getId());
        project = projectRepository.save(project);
        return new ProjectDto(project);
    }

    @Override
    public ProjectDto getProjectById(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()){
            return null;
        }
        return new ProjectDto(project.get());
    }


    public List<ProjectUserDto> getUsersNotContainingProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()){
            return null;
        }
        List<ProjectUserDto> list = userRepository.findByParticipatedProjectsNotContaining(project.get())
                .stream().map(user -> new ProjectUserDto(user)).collect(Collectors.toList());
        return list;
    }

    @Override
    public List<ProjectUserDto> getUsersByProjectId(ProjectRequestDto dto) {
        Optional<Project> opt = projectRepository.findById(dto.getProjectId());
        if (opt.isEmpty()){
            return null;
        }
        Project existingProject = opt.get();
        return existingProject.getParticipatingUsers()
                .stream().map(user -> new ProjectUserDto(user)).collect(Collectors.toList());
    }

    @Override
    public List<ProjectDto> getAllProjects() {
        User user = userService.findUserByAuthentication();
        return projectRepository.findProjectsByUserId(user.getId())
                .stream().map(ProjectDto::new).collect(Collectors.toList());
    }

    @Override
    public ProjectDto updateProject(Long id, Project project) {
        Optional<Project> opt = projectRepository.findById(id);
        if (opt.isEmpty()){
            return null;
        }
        Project existingProject = opt.get();
        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        existingProject.setProjectCode(project.getProjectCode());
        existingProject.setCreatedAt(project.getCreatedAt());
        project.setUpdatedAt(new Date());
        project.setUpdatedBy(userService.findUserByAuthentication());
        return new ProjectDto(projectRepository.save(existingProject));
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // Task CRUD
    @Override
    public TaskDTO createTask(CreateTaskDTO dto) {
        Optional<Project> project = projectRepository.findById(dto.getProjectId());
        if (project.isEmpty()){
            return null;
        }
        Task task = new Task(dto);
        task.setStatus(TaskStatus.TO_DO);
        task.setProject(project.get());
        task.setTaskNumber(UUID.randomUUID().toString());
        task.setCreatedAt(new Date());
        task.setCreatedBy(userService.findUserByAuthentication());


        String email = getAssignedEmail(dto.getAssigned(), dto.getAssignToMe());
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()){
            task.setAssigned(email);
            task.setUser(user.get());
        }
        if (dto.getAddToActiveSprint() != null && dto.getAddToActiveSprint()){
            Optional<Sprint> sprint = sprintRepository.findByProjectAndStatus(project.get(), SprintStatus.ACTIVE);
            if (sprint.isPresent()){
                task.setSprint(sprint.get());
            }
        }
        if (task.getSprint() == null || dto.getAddToBackLog()){
            backlogService.addToBackLog(task, project.get());
        }
        Task taskNew = taskRepository.save(task);
        taskNew.setTaskNumber("TASK-" + taskNew.getId().toString());
        taskNew.setTaskNumber(JobConstant.TASK_CODE_PREFIX+taskNew.getId().toString());
        return new TaskDTO(taskRepository.save(taskNew));
    }

    private String getAssignedEmail(String assigned, Boolean assignToMe){
        String email;
        if (assigned != null ){
            email = assigned;
        } else if (assigned == null || (assignToMe != null && assignToMe)){
            email = SecurityContextHolder.getContext().getAuthentication().getName();
        } else {
            email = SecurityContextHolder.getContext().getAuthentication().getName();
        }
        if (email == null || "".equals(email)){
            email = SecurityContextHolder.getContext().getAuthentication().getName();
        }
        return email;
    }

    @Override
    public TaskDTO getTaskDetailById(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isEmpty()){
            return null;
        }
        TaskDTO dto = new TaskDTO(task.get());
        return dto;
    }

    @Override
    public List<TaskDTO> getTaskByProjectId(Long id){
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()){
            return null;
        }
        return project.map(value -> taskRepository.findByProject(value)
                .stream()
                .map(TaskDTO::new).collect(Collectors.toList())).orElse(null);

    }
    @Override
    public BaseResponse<List<TaskDTO>> getMyTaskByProjectId(TaskRequestDTO dto){
        Optional<Project> project = projectRepository.findById(dto.getProjectId());
        if (project.isEmpty()){
            return new BaseResponse<List<TaskDTO>>(false, HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Project not found");
        }
        List<TaskDTO> dtoList = taskRepository.findByProjectAndUser(
                        project.get(),userService.findUserByAuthentication())
                .stream()
                .map(TaskDTO::new).collect(Collectors.toList());
        return new BaseResponse<List<TaskDTO>>(false, HttpStatus.OK,dtoList,
                SprintResponseStatus.OK.name(),"My Task okey");
    }
    @Override
    public List<TaskDTO> getTaskByProjectIdAndActiveSprint(TaskRequestDTO dto){
        Optional<Project> project = projectRepository.findById(dto.getProjectId());
        if (project.isEmpty()){
            return null;
        }
        Optional<Sprint> sprint = sprintRepository.findByProjectAndStatus(
                project.get(), SprintStatus.ACTIVE);
        if (sprint.isEmpty()){
            return null;
        }
        return project.map(value -> taskRepository.findByProjectAndSprint(
                project.get(),sprint.get())
                .stream()
                .map(TaskDTO::new).collect(Collectors.toList())).orElse(null);

    }
    @Override
    public BaseResponse<List<TaskDTO>> getBacklogTaskByProjectId(TaskRequestDTO task){
        Optional<Project> project = projectRepository.findById(task.getProjectId());
        if (project.isEmpty()){
            return new BaseResponse<List<TaskDTO>>(false, HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Project not found");
        }
        Optional<Backlog> backlog = backlogRepository.findByProject(project.get());
        if (backlog.isEmpty()){
            return new BaseResponse<List<TaskDTO>>(false, HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Backlog not found");
        }
        List<TaskDTO> dtoList = taskRepository.findByProjectAndBacklog(project.get(), backlog.get()).stream()
                .map(TaskDTO::new).collect(Collectors.toList());

        return new BaseResponse<List<TaskDTO>>(true, HttpStatus.OK,dtoList,
                SprintResponseStatus.OK.name(),"Tasks ok");
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(TaskDTO::new).collect(Collectors.toList());
    }

    @Override
    public TaskDTO updateTaskStatus(Long id, Task task) {
        Task existingTask = getTaskById(id);
        existingTask.setStatus(task.getStatus());
        task.setUpdatedAt(new Date());
        task.setUpdatedBy(userService.findUserByAuthentication());
        return new TaskDTO(taskRepository.save(existingTask));
    }

    @Override
    public TaskDTO updateTask(Long id, TaskRequestDTO dto) throws Exception {
        if(id == null){
            throw new Exception("Not found id : "+id);
        }
        Optional<Task> taskOpt = taskRepository.findById(id);
        if(taskOpt.isEmpty()){
            throw new Exception("Not found task : "+id);
        }
        Task task = new Task(taskOpt.get(), dto);
        String email = getAssignedEmail(dto.getAssigned(), dto.getAssignToMe());
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()){
            task.setAssigned(email);
            task.setUser(user.get());
        }
        task.setUpdatedAt(new Date());
        task.setUpdatedBy(userService.findUserByAuthentication());
        return new TaskDTO(taskRepository.save(task));
    }
    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // Comment CRUD
    @Override
    public CommentDto createComment(CommentDto dto) {
        Optional<Task> taskOpt = taskRepository.findById(dto.getTaskId());
        if(taskOpt.isEmpty()){
            return null;
        }
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isEmpty()){
            return null;
        }
        Comment comment = new Comment(dto);
        comment.setUser(userOpt.get());
        comment.setTask(taskOpt.get());
        comment.setCreatedAt(new Date());
        comment.setCreatedBy(userService.findUserByAuthentication());
        comment = commentRepository.save(comment);
        dto.setId(comment.getId());
        return dto;
    }

    @Override
    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment updateComment(Long id, Comment comment) {
        Comment existingComment = getCommentById(id);
        existingComment.setComment(comment.getComment());
        existingComment.setUser(comment.getUser());
        existingComment.setCreatedAt(comment.getCreatedAt());
        existingComment.setTask(comment.getTask());
        existingComment.setUpdatedAt(new Date());
        existingComment.setUpdatedBy(userService.findUserByAuthentication());
        return commentRepository.save(existingComment);
    }

    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public Task getTaskById(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isEmpty()){
            return null;
        }
        return task.get();
    }
}