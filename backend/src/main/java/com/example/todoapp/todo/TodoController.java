package com.example.todoapp.todo;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@AllArgsConstructor
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{projectId}")
    public List<Todo> getAllTodoByProjectId(@PathVariable UUID projectId) {
        return todoService.getTodosByProjectId(projectId);
    }

    @PostMapping("/{projectId}")
    public Todo createtodos(@RequestBody Todo todo, @PathVariable UUID projectId) {
        return todoService.createTodo(todo, projectId);
    }

    @PutMapping
    public Todo updatetodos(@RequestBody Todo todo, @RequestParam UUID projectId) {
        return todoService.updateTodoById(todo, projectId);
    }

    @DeleteMapping
    public Todo deletetodos(@RequestParam UUID id) {
        return todoService.deleteTodoById(id);
    }


}
