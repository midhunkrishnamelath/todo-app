package com.example.todoapp.project;


import com.example.todoapp.user.User;
import com.example.todoapp.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ProjectService {

    private final ProjectsRepository projectsRepository;
    private final UserRepository userRepository;

    public Projects createProject(Projects project, Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            project.setUser(user.get());
            return projectsRepository.save(project);
        } else throw new RuntimeException("User not found with id: " + userId);
    }

    public List<Projects> getProjectsByUserId(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        return projectsRepository.findByUserId(userId);
    }

    public Projects updateProjectById(Projects projects, Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            projects.setUser(user.get());
            return projectsRepository.save(projects);
        } else throw new RuntimeException("User not found with id: " + userId);
    }

    public Projects deleteProjectById(UUID id) {
        Optional<Projects> projectsOptional = projectsRepository.findById(id);
        if (projectsOptional.isPresent()) {
            Projects project = projectsOptional.get();
            projectsRepository.delete(project);
            return project;
        } else {
            throw new RuntimeException("Project not found with id: " + id);
        }
    }

}
