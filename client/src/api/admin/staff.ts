import IStaff from "@/interfaces/Staff";
import axiosClient from "../axiosClient";

const adminStaffAPI = {
  getList: async (): Promise<IStaff[]> => {
    const url = "/staff";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IStaff> => {
    const url = `/staff/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, desc: string): Promise<IStaff> => {
    const url = "/staff/store";
    const res = await axiosClient.post(url, { name, desc });
    return res.data;
  },
};

export default adminStaffAPI;
