import ILogin from "@/interfaces/Login";
import axiosClient from "./axiosClient";

const authAPI = {
  login: async (username: string, password: string): Promise<ILogin> => {
    const url = "user/login";
    const res = await axiosClient.post(url, { username, password });
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

  load: async (): Promise<ILogin> => {
    const url = "user/load";
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default authAPI;
