import ILogin from "@/interfaces/Login";
import IUser from "@/interfaces/User";
import axiosClient from "./axiosClient";

const authAPI = {
  login: async (email: string, password: string): Promise<ILogin> => {
    const url = "/api/auth/login";
    const res = await axiosClient.post(url, { email, password });
    return res.data;
  },

  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    agreeCkb: boolean,
    passwordConfirmation: string
  ): Promise<any> => {
    const url = "/api/auth/register";
    const reqSchema = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      agree_ckb: agreeCkb,
      password_confirmation: passwordConfirmation,
    };
    const res = await axiosClient.post(url, reqSchema);
    return res;
  },

  logout: async () => {
    const url = "/api/auth/logout";
    const res = await axiosClient.post(url);
    return res.data;
  },
};

export default authAPI;
