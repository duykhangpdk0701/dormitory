import ITask from "@/interfaces/Task";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminTaskAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 1
  ): Promise<ITask[]> => {
    const url = "/task";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<ITask> => {
    const url = `/task/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    staffId: string,
    desc: string,
    dateAssign: Date
  ): Promise<ITask> => {
    const url = "/task/store";
    const res = await axiosClient.post(url, {
      description: desc,
      staffId,
      dateAssign,
    });
    return res.data;
  },
};

export default adminTaskAPI;
