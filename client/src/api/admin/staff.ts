import IStaff from "@/interfaces/Staff";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminStaffAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IStaff[]> => {
    const url = "/staff";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IStaff> => {
    const url = `/staff/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, desc: string): Promise<IStaff> => {
    const url = "/staff/store";
    const res = await axiosClient.post(url, { name, desc });
    return res.data;
  },
};

export default adminStaffAPI;
