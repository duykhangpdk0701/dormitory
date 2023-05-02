import ITask from "@/interfaces/Task";
import axiosClient from "../axiosClient";

const adminTaskAPI = {
  getList: async (): Promise<ITask[]> => {
    const url = "/task";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<ITask> => {
    const url = `/task/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    staffId: string,
    desc: string,
    dateAssign: Date
  ): Promise<ITask> => {
    const url = "/task/store";
    const res = await axiosClient.post(url, {
      description: desc,
      staffId,
      dateAssign,
    });
    return res.data;
  },
};

export default adminTaskAPI;
