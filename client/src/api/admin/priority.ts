import IPriority from "@/interfaces/Priority";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminPriorityAPI = {
  getList: async (
    search?: string,
    limit?: number,
    page?: number
  ): Promise<IPriority[]> => {
    const url = "/priority";

    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page ? page : undefined } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IPriority> => {
    const url = `/priority/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, score: number): Promise<IPriority> => {
    const url = "/priority/store";
    const res = await axiosClient.post(url, { name, score });
    return res.data;
  },

  update: async (
    id: string,
    name: string,
    score: number
  ): Promise<IPriority> => {
    const url = "/priority";
    const res = await axiosClient.put(url, { id, name, score });
    return res.data;
  },
};

export default adminPriorityAPI;
