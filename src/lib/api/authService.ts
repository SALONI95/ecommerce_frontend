import api from "./api";

class AuthService {
  login = async (credentials: { email: string; password: string }) => {
    const { data } = await api.post("auth/login", {
      ...credentials,
      role: "USER",
    });
    return data;
  };

  signup = async (data: {
    fullname: string;
    email: string;
    password: string;
    mobileNo: number;
  }) => {
    return api.post("auth/signup", { ...data, role: "USER" });
  };

  emailSend = async (email: { email: string }) => {
    return api.post("auth/password-reset-link", email);
  };

  resetPassword = async (token: { token: string }) => {
    return api.post("auth/reset-password", token);
  };

  refreshToken = async () => {
    return api.post("auth/refresh-token");
  };

  getUserData = async () => {
    const data = await api.get("auth/get-user-data", { withCredentials: true });
    return data;
  };
  setAuthorizationHeader(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  logout() {
    return api.post("auth/logout");
  }
}

export const authService = new AuthService();
