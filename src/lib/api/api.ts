import axios from "axios";
import conf from "../config/conf";
import { authService } from "./authService";

const api = axios.create({
  baseURL: conf.API_URL,
});

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await authService.refreshToken();

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export function setAuthorizationHeader(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export function getTokenFromLocalStorage() {
  return localStorage.getItem("token") || null;
}

export default api;
