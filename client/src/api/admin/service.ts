import IService from "@/interfaces/Service";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminServiceAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IService[]> => {
    const url = "/service";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IService> => {
    const url = `/service/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    name: string,
    desc: string,
    price: number
  ): Promise<IService> => {
    const url = "/service/store";
    const res = await axiosClient.post(url, { name, desc, price });
    return res.data;
  },
};

export default adminServiceAPI;
