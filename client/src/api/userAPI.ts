import IUser from "@/interfaces/User";
import axiosClient from "./axiosClient";

const userAPI = {
  getUserDetail: async (): Promise<IUser> => {
    const url = "/api/auth/user";
    const res = await axiosClient.get(url);
    return res.data;
  },

  updateUserProfile: async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: string
  ): Promise<IUser> => {
    const url = "api/v1/my-profile/update";
    const res = await axiosClient.put(url, {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    });
    return res.data;
  },

  updatePassword: async (
    currentPassword: string,
    password: string,
    passwordConfirmation: string
  ): Promise<IUser> => {
    const url = "api/v1/my-profile/change-password";
    const res = await axiosClient.put(url, {
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    });
    return res.data;
  },
};

export default userAPI;
