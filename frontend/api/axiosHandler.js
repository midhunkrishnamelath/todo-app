import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log({ baseUrl });

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const requestHandler = (request) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!request.url.startsWith(`users`)) {
    const authHeader = localStorage.getItem("authHeader");
    console.log({ authHeader });

    request.headers = {
      ...request.headers,
      Authorization: authHeader,
    };
  }
  return request;
};

const errorHandler = (error) => {
  if (!error.response) {
    console.log(error);
  } else if (error.response.status != 200) {
    console.log(error);
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  return response;
};

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
axiosInstance.interceptors.request.use((request) => requestHandler(request));
export default axiosInstance;
