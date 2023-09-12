import axios from "axios";

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
      if (response.data.msg) {
        localStorage.setItem("x-auth-token", JSON.stringify(response.data.msg));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("x-auth-token") ;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("x-auth-token");
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