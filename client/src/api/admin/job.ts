import IJob from "@/interfaces/Job";
import axiosClient from "../axiosClient";

const adminJobAPI = {
  getList: async (): Promise<IJob[]> => {
    const url = "/job";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IJob> => {
    const url = `/job/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, desc: string): Promise<IJob> => {
    const url = "/job/store";
    const res = await axiosClient.post(url, { name, description: desc });
    return res.data;
  },
};

export default adminJobAPI;
