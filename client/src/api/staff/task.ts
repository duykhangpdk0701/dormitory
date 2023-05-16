import ITask from "@/interfaces/Task";
import axiosClient from "../axiosClient";

const staffTaskAPI = {
  getByAccountId: async (accountId: string): Promise<ITask[]> => {
    const url = `/task?accountId=${accountId}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<ITask> => {
    const url = `/task/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  startTask: async (id: string): Promise<ITask> => {
    const url = `/task/${id}/start`;
    const res = await axiosClient.put(url);
    return res.data;
  },

  DoneTask: async (id: string): Promise<ITask> => {
    const url = `/task/${id}/done`;
    const res = await axiosClient.put(url);
    return res.data;
  },

  CancelTask: async (id: string): Promise<ITask> => {
    const url = `/task/${id}/cancel`;
    const res = await axiosClient.put(url);
    return res.data;
  },
};

export default staffTaskAPI;
