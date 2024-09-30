package com.example.todoapp.project;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface ProjectsRepository extends JpaRepository<Projects, UUID>  {
    Optional<Projects> findById(UUID id);
    List<Projects> findByUserId(Integer userId);
    }
