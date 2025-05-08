package com.app.jobTS.sign.job.service;

import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.auth.repository.UserRepository;
import com.app.jobTS.sign.auth.service.UserService;
import com.app.jobTS.sign.constant.JobConstant;
import com.app.jobTS.sign.job.dto.comment.CommentDto;
import com.app.jobTS.sign.job.dto.project.ProjectDto;
import com.app.jobTS.sign.job.dto.task.CreateTaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskDTO;
import com.app.jobTS.sign.job.dto.task.TaskRequestDTO;
import com.app.jobTS.sign.job.entity.*;
import com.app.jobTS.sign.job.model.SprintStatus;
import com.app.jobTS.sign.job.model.TaskStatus;
import com.app.jobTS.sign.job.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BacklogServiceImpl {

    @Autowired
    private BacklogRepository backlogRepository;

    public void addToBackLog(Task task, Project project){
        Optional<Backlog> opt = backlogRepository.findByProject(project);
        Backlog backlog;
        if (opt.isPresent()){
            backlog = opt.get();
        }else{
            backlog = new Backlog();
            backlog.setProject(project);
            backlog = backlogRepository.save(backlog);
        }
        task.setBacklog(backlog);
    }
    public Backlog findByProject(Project project){
        Optional<Backlog> opt = backlogRepository.findByProject(project);
        if (opt.isEmpty()){
            return null;
        }
        return opt.get();
    }

    public Backlog save(Backlog backlog){
        Optional<Backlog> opt = backlogRepository.findByProject(backlog.getProject());
        if (opt.isPresent()){
            return null;
        }
        return backlogRepository.save(backlog);
    }
}