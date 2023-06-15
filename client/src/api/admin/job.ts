import IJob from "@/interfaces/Job";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminJobAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 1
  ): Promise<IJob[]> => {
    const url = "/job";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IJob> => {
    const url = `/job/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, desc: string): Promise<IJob> => {
    const url = "/job/store";
    const res = await axiosClient.post(url, { name, description: desc });
    return res.data;
  },

  update: async (id: string, name: string, desc: string): Promise<IJob> => {
    const url = `/job/${id}`;
    const res = await axiosClient.put(url, { name, description: desc });
    return res.data;
  },
};

export default adminJobAPI;
