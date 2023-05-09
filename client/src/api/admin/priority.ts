import IPriority from "@/interfaces/Priority";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminPriority = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IPriority[]> => {
    const url = "/priority";

    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
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
    const url = "/priority";
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

export default adminPriority;
