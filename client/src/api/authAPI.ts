import ILogin from "@/interfaces/Login";
import axiosClient from "./axiosClient";

const authAPI = {
  login: async (email: string, password: string): Promise<ILogin> => {
    const url = "auth/login";
    const res = await axiosClient.post(url, { email, password });
    return res.data;
  },

  register: async (
    username: string,
    password: string,
    permission: string
  ): Promise<any> => {
    const url = "user/register";
    const res = await axiosClient.post(url, { username, password, permission });
    return res;
  },
};

export default authAPI;
