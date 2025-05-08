package com.app.jobTS.sign.job.service;

import com.app.jobTS.sign.auth.service.UserService;
import com.app.jobTS.sign.constant.JobConstant;
import com.app.jobTS.sign.job.dto.sprint.SprintDto;
import com.app.jobTS.sign.job.entity.Project;
import com.app.jobTS.sign.job.entity.Sprint;
import com.app.jobTS.sign.job.entity.SprintTriggerCode;
import com.app.jobTS.sign.job.entity.Task;
import com.app.jobTS.sign.job.model.SprintStatus;
import com.app.jobTS.sign.job.repository.ProjectRepository;
import com.app.jobTS.sign.job.repository.SprintRepository;
import com.app.jobTS.sign.job.repository.SprintTriggerCodeRepository;
import com.app.jobTS.sign.job.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SprintTriggerCodeServiceImp {

    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final SprintTriggerCodeRepository sprintTriggerCodeRepository;

    private final  UserService userService;
    public SprintTriggerCodeServiceImp(SprintRepository sprintRepository,
                                       ProjectRepository projectRepository,
                                       TaskRepository taskRepository,
                                       SprintTriggerCodeRepository sprintTriggerCodeRepository, UserService userService) {
        this.sprintRepository = sprintRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.sprintTriggerCodeRepository = sprintTriggerCodeRepository;
        this.userService = userService;
    }
    public SprintTriggerCode saveSprintTriggerCode(Project project){
        SprintTriggerCode triggerCode;
        Optional<SprintTriggerCode> optional = sprintTriggerCodeRepository.findByProject(project);
        if (optional.isPresent()) {
            triggerCode = optional.get();
            triggerCode.setCurrentCode(triggerCode.getCurrentCode()+1);
        }else {
            triggerCode = new SprintTriggerCode();
            triggerCode.setProject(project);
            triggerCode.setCurrentCode(1);
        }
        return sprintTriggerCodeRepository.save(triggerCode);
    }
}
