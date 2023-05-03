import IViolation from "@/interfaces/Violation";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminViolationAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IViolation[]> => {
    const url = "/violation";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IViolation> => {
    const url = `/violation/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    title: string,
    civilianId: string,
    desc: string
  ): Promise<IViolation> => {
    const url = "/violation/store";
    const res = await axiosClient.post(url, {
      title,
      civilianId,
      description: desc,
    });
    return res.data;
  },
};

export default adminViolationAPI;
