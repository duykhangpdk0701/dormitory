import queryString from "query-string";
import axiosClient from "../axiosClient";
import IPermission from "@/interfaces/Permission";

const adminPermissionAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IPermission[]> => {
    const url = "/permission";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  create: async (name: string, description: string): Promise<IPermission> => {
    const url = "/permission/store";
    const res = await axiosClient.post(url, { name, description });
    return res.data;
  },

  getById: async (id: string): Promise<IPermission> => {
    const url = `/permission/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  update: async (
    id: string,
    name: string,
    description: string
  ): Promise<IPermission> => {
    const url = `/permission/${id}`;
    const res = await axiosClient.put(url, { name, description });
    return res.data;
  },
};

export default adminPermissionAPI;
