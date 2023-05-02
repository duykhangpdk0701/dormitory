import IService from "@/interfaces/Service";
import axiosClient from "../axiosClient";

const adminServiceAPI = {
  getList: async (): Promise<IService[]> => {
    const url = "/service";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IService> => {
    const url = `/service/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    name: string,
    desc: string,
    price: number
  ): Promise<IService> => {
    const url = "/service/store";
    const res = await axiosClient.post(url, { name, desc, price });
    return res.data;
  },
};

export default adminServiceAPI;
