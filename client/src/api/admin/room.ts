import IRoom from "@/interfaces/Room";
import axiosClient from "../axiosClient";

const adminRoomAPI = {
  getList: async (): Promise<IRoom[]> => {
    const url = "/room";
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (): Promise<IRoom> => {
    const url = "/room/store";
    const res = await axiosClient.post(url);
    return res.data;
  },
};

export default adminRoomAPI;
