import IRoom from "@/interfaces/Room";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminRoomAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IRoom[]> => {
    const url = "/room";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  create: async (): Promise<IRoom> => {
    const url = "/room/store";
    const res = await axiosClient.post(url);
    return res.data;
  },
};

export default adminRoomAPI;
