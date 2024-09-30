package com.example.todoapp.todo;

import com.example.todoapp.project.Projects;
import com.example.todoapp.project.ProjectsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class TodoService {
    private final TodoRepository todoRepository;
    private final ProjectsRepository projectsRepository;

    public Todo createTodo(Todo todo, UUID projectId) {
        Optional<Projects> project = projectsRepository.findById(projectId);
        if (project.isPresent()) {
            todo.setProject(project.get());
            return todoRepository.save(todo);
        } else throw new RuntimeException("Project not found with id: " + projectId);

    }

    public List<Todo> getTodosByProjectId(UUID projectId) {
        if (!projectsRepository.existsById(projectId)) {
            throw new RuntimeException("project not found with id: " + projectId);
        }
        return todoRepository.findByProjectId(projectId);
    }

    public Todo updateTodoById(Todo todo, UUID projectId) {
        Optional<Projects> project = projectsRepository.findById(projectId);
        if (project.isPresent()) {
            todo.setProject(project.get());
            return todoRepository.save(todo);
        } else throw new RuntimeException("Project not found with id: " + projectId);
    }

    public Todo deleteTodoById(UUID id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);
        if (todoOptional.isPresent()) {
            Todo todo = todoOptional.get();
            todoRepository.delete(todo);
            return todo;
        } else {
            throw new RuntimeException("todo not found with id: " + id);
        }
    }

}
