import IDevice from "@/interfaces/Device";
import axiosClient from "../axiosClient";

const adminDeviceAPI = {
  getList: async (): Promise<IDevice[]> => {
    const url = "/device";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IDevice> => {
    const url = `/device/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    name: string,
    desc: string,
    roomId: string,
    dateAdd: Date,
    price: number
  ): Promise<IDevice> => {
    const url = "/device/store";
    const res = await axiosClient.post(url, {
      name,
      description: desc,
      roomId,
      dateAdd,
      price,
    });
    return res.data;
  },
};

export default adminDeviceAPI;
