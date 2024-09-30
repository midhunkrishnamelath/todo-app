package com.example.todoapp.project;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@AllArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping("/{userId}")
    public List<Projects> getAllProjectsByUserId(@PathVariable Integer userId) {
        return projectService.getProjectsByUserId(userId);
    }

    @PostMapping("/{userId}")
    public Projects createprojects(@RequestBody Projects projects, @PathVariable Integer userId){
        return projectService.createProject(projects, userId);
    }

    @PutMapping
    public Projects updateprojects(@RequestBody Projects projects, @RequestParam Integer userId){
        return projectService.updateProjectById(projects, userId);
    }

    @DeleteMapping
    public Projects delteprojects(@RequestParam UUID id){
        return projectService.deleteProjectById(id);
    }
}
