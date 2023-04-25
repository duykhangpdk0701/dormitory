import IRoomType from "@/interfaces/RoomTypet";
import axiosClient from "../axiosClient";

const adminRoomTypeAPI = {
  getList: async (): Promise<IRoomType[]> => {
    const url = "/roomType";
    const res = await axiosClient.get(url);

    return res.data;
  },
};

export default adminRoomTypeAPI;
