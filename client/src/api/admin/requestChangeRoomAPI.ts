import queryString from "query-string";
import axiosClient from "../axiosClient";
import IRequestChangeRoom from "@/interfaces/RequestChangeRoom";

const adminRequestChangeRoomeAPI = {
  getAll: async (
    search?: string,
    limit?: number,
    page?: number
  ): Promise<IRequestChangeRoom[]> => {
    const url = "/requestChangeRoom";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page ? page : undefined } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  deny: async (id: string): Promise<IRequestChangeRoom> => {
    const url = `/requestChangeRoom/${id}/denied`;
    const res = await axiosClient.put(url);
    return res.data;
  },

  accepted: async (id: string): Promise<IRequestChangeRoom> => {
    const url = `/requestChangeRoom/${id}/accepted`;
    const res = await axiosClient.put(url);
    return res.data;
  },
};

export default adminRequestChangeRoomeAPI;
