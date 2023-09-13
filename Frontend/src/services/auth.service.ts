import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.3.42:3001/auth/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }

      return response.data;
    });
};

export const logout = () => {
  return axios
    .get(API_URL + "logout", { headers: authHeader() })
    .then((response) => {
      localStorage.removeItem("token");
      return response.data;
    });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("token");
  if (userStr) return JSON.parse(userStr);

  return null;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;