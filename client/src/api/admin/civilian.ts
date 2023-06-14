import ICivilian from "@/interfaces/Civilian";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminCivilianAPI = {
  getList: async (
    search?: string,
    limit?: number,
    page?: number
  ): Promise<ICivilian[]> => {
    const url = "/civilian";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page ? page + 1 : undefined } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<ICivilian> => {
    const url = `/civilian/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getByRoomId: async (id: string): Promise<ICivilian> => {
    const url = `/civilian/?room=${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};
export default adminCivilianAPI;
