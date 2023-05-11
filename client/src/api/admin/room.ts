import IRoom from "@/interfaces/Room";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminRoomAPI = {
  getList: async (
    search?: string,
    limit?: number,
    page?: number
  ): Promise<IRoom[]> => {
    const url = "/room";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page ? page + 1 : undefined } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IRoom> => {
    const url = `/room/${id}`;
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
