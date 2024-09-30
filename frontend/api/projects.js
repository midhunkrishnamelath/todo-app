import axiosInstance from "./axiosHandler";

export async function getProjects(userId) {
  return axiosInstance.get(`api/projects/${userId}`);
}

export async function addProject(userId, project) {
  return axiosInstance.post(`api/projects/${userId}`, project);
}

export async function deleteProject(projectId) {
  return axiosInstance.delete(`api/projects`, { params: { id: projectId } });
}

export async function updateProject(project,userId) {
  return axiosInstance.put(`api/projects`, project,{ params: { userId: userId } });
}
