import IUser from "@/interfaces/User";
import axiosClient from "./axiosClient";

const userAPI = {
  load: async () => {
    const url = "/api/auth/login";
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default userAPI;
