import axiosInstance from "./axiosHandler";

export async function signup(data) {
  return axiosInstance.post("users/register", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function login(email, password) {
  return axiosInstance.post("users/login", null, {
    params: {
      email: email,
      password: password,
    },
  });
}
