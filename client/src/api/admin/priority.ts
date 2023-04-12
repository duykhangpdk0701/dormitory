import IPriority from "@/interfaces/Priority";
import axiosClient from "../axiosClient";

const adminPriority = {
  getList: async (): Promise<IPriority[]> => {
    const url = "/priority";
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, score: string): Promise<IPriority> => {
    const url = "/priority";
    const res = await axiosClient.post(url, { name, score });
    return res.data;
  },
};

export default adminPriority;
