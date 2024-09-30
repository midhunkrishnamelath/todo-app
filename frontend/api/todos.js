import axiosInstance from "./axiosHandler";

export async function getTodos(projectId) {
  return axiosInstance.get(`api/todos/${projectId}`);
}

export async function addTodo(projectId, todo) {
  return axiosInstance.post(`api/todos/${projectId}`, todo);
}

export async function deleteTodo(todoId) {
  return axiosInstance.delete(`api/todos`, { params: { id: todoId } });
}

export async function updateTodo(projectId, todo) {
  return axiosInstance.put(`api/todos`, todo,{ params: { projectId: projectId } });
}
