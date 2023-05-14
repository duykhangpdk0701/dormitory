import IRoomType from "@/interfaces/RoomTypet";
import axiosClient from "./axiosClient";

const roomTypeAPI = {
  getListOfRoom: async (): Promise<IRoomType[]> => {
    const url = "/roomType";
    const res = await axiosClient.get(url);

    return res.data;
  },

  getById: async (id: string): Promise<IRoomType> => {
    const url = `/roomType/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default roomTypeAPI;
