package com.app.jobTS.sign.job.service;

import com.app.jobTS.sign.auth.service.UserService;
import com.app.jobTS.sign.base.model.BaseResponse;
import com.app.jobTS.sign.constant.JobConstant;
import com.app.jobTS.sign.job.dto.sprint.SprintDto;
import com.app.jobTS.sign.job.dto.sprint.SprintRequestDto;
import com.app.jobTS.sign.job.dto.sprint.SprintResponseStatus;
import com.app.jobTS.sign.job.dto.sprint.SprintTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.entity.*;
import com.app.jobTS.sign.job.model.SprintStatus;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.repository.ProjectRepository;
import com.app.jobTS.sign.job.repository.SprintRepository;
import com.app.jobTS.sign.job.repository.SprintTriggerCodeRepository;
import com.app.jobTS.sign.job.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SprintServiceImp {

    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final SprintTriggerCodeRepository sprintTriggerCodeRepository;
    private final SprintTriggerCodeServiceImp sprintTriggerCodeServiceImp;

    private final  UserService userService;
    public SprintServiceImp(SprintRepository sprintRepository,
                            ProjectRepository projectRepository,
                            TaskRepository taskRepository,
                            SprintTriggerCodeRepository sprintTriggerCodeRepository, SprintTriggerCodeServiceImp sprintTriggerCodeServiceImp, UserService userService) {
        this.sprintRepository = sprintRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.sprintTriggerCodeRepository = sprintTriggerCodeRepository;
        this.sprintTriggerCodeServiceImp = sprintTriggerCodeServiceImp;
        this.userService = userService;
    }

    public SprintDto createSprint( SprintDto dto) {
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        Sprint sprint = new Sprint(dto);
        sprint.setProject(project);
        sprint.setCreatedBy(userService.findUserByAuthentication());
        sprint.setCreatedAt(new Date());
        sprint.setStatus(SprintStatus.PLANNED);
        sprint = sprintRepository.save(sprint);
        SprintTriggerCode triggerCode = sprintTriggerCodeServiceImp.saveSprintTriggerCode(project);
        sprint.setSprintCode(JobConstant.SPR_CODE_PREFIX + triggerCode.getCurrentCode());
        sprint = sprintRepository.save(sprint);
        return new SprintDto(sprint);
    }


    @Transactional
    public BaseResponse<SprintDto> getSprint(SprintRequestDto dto) {
        Optional<Sprint> optionalSprint = sprintRepository.findById(dto.getSprintId());
        if (optionalSprint.isEmpty()) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Sprint not found");

        }
        Sprint sprint = optionalSprint.get();
        Optional<Project> optionalProject = projectRepository.findById(dto.getProjectId());
        if (optionalProject.isEmpty()) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Project not found");

        }
        Project project = optionalProject.get();
        if (!sprint.getProject().getId().equals(project.getId())) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.CONFLICT_PROJECT.name(),"Project conflict");

        }
        return new BaseResponse<SprintDto>(true,HttpStatus.OK,new SprintDto(sprint),
                SprintResponseStatus.ACTIVE.name(),"Sprint  activated");
    }


    @Transactional
    public BaseResponse changeStatus(SprintRequestDto dto) {
        Optional<Sprint> optionalSprint = sprintRepository.findById(dto.getSprintId());
        if (optionalSprint.isEmpty()) {
            return new BaseResponse<Boolean>(false,HttpStatus.OK,false,
                    SprintResponseStatus.NOT_FOUND.name(),"Sprint not found");

        }
        Sprint sprint = optionalSprint.get();
        Optional<Project> optionalProject = projectRepository.findById(dto.getProjectId());
        if (optionalProject.isEmpty()) {
            return new BaseResponse<Boolean>(false,HttpStatus.OK,false,
                    SprintResponseStatus.NOT_FOUND.name(),"Project not found");

        }
        Project project = optionalProject.get();
        if (!sprint.getProject().getId().equals(project.getId())) {
            return new BaseResponse<Boolean>(false,HttpStatus.OK,null,
                    SprintResponseStatus.CONFLICT_PROJECT.name(),"Project conflict");

        }

        if (dto.getStatus() == SprintStatus.ACTIVE && controlAllSprintStatus(project.getSprints(), dto.getStatus())) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_ACTIVE.name(),"There are sprints are ACTIVE");
        }
        if (dto.getStatus() == SprintStatus.COMPLETED && !controlAllTaskStatus(sprint, TaskStatus.DONE)) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_ACTIVE.name(),"There are task are not DONE");
        }
        sprint.setStatus(dto.getStatus());
        sprintRepository.save(sprint);
        return new BaseResponse<Boolean>(true,HttpStatus.OK,true,
                SprintResponseStatus.CHANGED_STATUS.name(),"Sprint Status changed");
    }


    @Transactional
    public BaseResponse<SprintDto> startSprint(Long sprintId) {
        Optional<Sprint> optional = sprintRepository.findById(sprintId);
        if (optional.isEmpty()) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Sprint not found");
        }
        Sprint sprint = optional.get();
        if (sprint.getStatus() != SprintStatus.PLANNED) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                SprintResponseStatus.NOT_PLANNED.name(),"Only planned sprints can be started");
        }
        Project project = sprint.getProject();


        if (controlAllSprintStatus(project.getSprints(), SprintStatus.ACTIVE)) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_ACTIVE.name(),"There are sprints are ACTIVE");
        }
        sprint.setStartDate(LocalDateTime.now());
        sprint.setStatus(SprintStatus.ACTIVE);
        sprint.setStartDate(LocalDateTime.now());
        sprint = sprintRepository.save(sprint);
        return new BaseResponse<SprintDto>(true,HttpStatus.OK,new SprintDto(sprint),
                SprintResponseStatus.ACTIVE.name(),"Sprint  activated");
    }

    @Transactional
    public BaseResponse completeSprint(Long sprintId) {
        Optional<Sprint> optional = sprintRepository.findById(sprintId);
        if (optional.isEmpty()) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Sprint not found");

        }
        Sprint sprint = optional.get();
        if (sprint.getStatus() != SprintStatus.ACTIVE) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_COMPLETED.name(),"Only in-progress sprints can be completed");

        }
        if (!controlAllTaskStatus(sprint, TaskStatus.DONE)) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_COMPLETED.name(),"There are tasks are not DONE");
        }
        sprint.setEndDate(LocalDateTime.now());
        sprint.setStatus(SprintStatus.COMPLETED);
        sprint.setEndDate(LocalDateTime.now());
        sprintRepository.save(sprint);
        SprintDto dto = new SprintDto(sprint);
        return new BaseResponse<SprintDto>(true,HttpStatus.OK,dto,
                SprintResponseStatus.COMPLETED.name(),"sprint is completed");
    }
    @Transactional
    public BaseResponse getTasksBySprint(SprintRequestDto dto) {
        Optional<Sprint> optionalSprint = sprintRepository.findById(dto.getSprintId());
        if (optionalSprint.isEmpty()) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Sprint not found");

        }
        Sprint sprint = optionalSprint.get();
        Optional<Project> optionalProject = projectRepository.findById(dto.getProjectId());
        if (optionalProject.isEmpty()) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Project not found");

        }
        Project project = optionalProject.get();
        if (!sprint.getProject().getId().equals(project.getId())) {
            return new BaseResponse<SprintDto>(false,HttpStatus.OK,null,
                    SprintResponseStatus.CONFLICT_PROJECT.name(),"Project conflict");

        }
        List<SprintTaskDTO> dtoList = null;
        if (sprint.getTasks() != null) {
            dtoList = sprint.getTasks().stream()
                    .map(task -> new SprintTaskDTO(task)).collect(Collectors.toList());
        }
        return new BaseResponse<List>(true,HttpStatus.OK,dtoList,
                SprintResponseStatus.COMPLETED.name(),"sprint is completed");
    }
    private boolean controlAllTaskStatus(Sprint sprint, TaskStatus taskStatus) {
        return sprint.getTasks() != null && sprint.getTasks().stream()
                .allMatch(task -> task.getStatus() == taskStatus);
    }

    private boolean controlAllSprintStatus(List<Sprint> sprints, SprintStatus status) {
        return sprints != null && sprints.stream()
                .anyMatch(sprint -> sprint.getStatus().name().equals(status.name()));
    }
    public List<SprintDto> getSprintsByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        List<SprintDto> dtoList = sprintRepository.findByProject(project).stream()
                .map(item -> new SprintDto(item)).collect(Collectors.toList());
        return dtoList;
    }
    public BaseResponse<List<SprintDto>> getAssignableSprintsByProject(SprintRequestDto dto) {
        Optional<Project> optionalProject = projectRepository.findById(dto.getProjectId());
        if (optionalProject.isEmpty()) {
            return new BaseResponse<List<SprintDto>>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Project not found");
        }
        Project project = optionalProject.get();
        List<SprintDto> dtoList = project.getSprints().stream()
                .filter(data -> data.getStatus() != SprintStatus.COMPLETED) // COMPLETED olmayanları filtrele
                .map(SprintDto::new) // SprintDto'ya dönüştür
                .collect(Collectors.toList()); // Listeye çevir

        return new BaseResponse<List<SprintDto>>(true,HttpStatus.OK,dtoList,
                SprintResponseStatus.OK.name(),"Sprint get all");
    }

    @Transactional
    public BaseResponse<SprintTaskDTO> assignTaskToSprint(SprintRequestDto dto) {

        Optional<Project> optionalProject = projectRepository.findById(dto.getProjectId());
        if (optionalProject.isEmpty()) {
            return new BaseResponse<SprintTaskDTO>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Project not found");
        }
        Project project = optionalProject.get();
        Optional<Task> optionalTask = taskRepository.findById(dto.getTaskId());
        if (optionalTask.isEmpty()) {
            return new BaseResponse<SprintTaskDTO>(false,HttpStatus.OK,null,
                    SprintResponseStatus.NOT_FOUND.name(),"Task not found");
        }
        Task task = optionalTask.get();
        task.setBacklog(null);
        task.setSprint(null);
        if (dto.getAddToBacklog() != null && dto.getAddToBacklog() ) {
            task.setBacklog(project.getBacklog());
        } else {Optional<Sprint> optionalSprint = sprintRepository.findById(dto.getSprintId());
            if (optionalSprint.isEmpty()) {
                return new BaseResponse<SprintTaskDTO>(false,HttpStatus.OK,null,
                        SprintResponseStatus.NOT_FOUND.name(),"Sprint not found");
            }
            Sprint sprint = optionalSprint.get();
            if (!sprint.getProject().getId().equals(project.getId())) {
                return new BaseResponse<SprintTaskDTO>(false,HttpStatus.OK,null,
                        SprintResponseStatus.CONFLICT_PROJECT.name(),"Project conflict");
            }

            if (sprint.getStatus() == SprintStatus.COMPLETED) {
                return new BaseResponse<SprintTaskDTO>(false,HttpStatus.OK,null,
                        SprintResponseStatus.NOT_COMPLETED.name(),"Cannot assign tasks to a completed sprint");
            }
            task.setSprint(sprint);
        }
        task = taskRepository.save(task);
        return new BaseResponse<SprintTaskDTO>(true,HttpStatus.OK,new SprintTaskDTO(task),
                SprintResponseStatus.OK.name(),"Task assigned");
    }

    public List<TaskDTO> getTasksBySprint(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found"));
        List<TaskDTO> dtoList = sprint.getTasks().stream()
                .map(item -> new TaskDTO(item)).collect(Collectors.toList());
        return dtoList;
    }
}
