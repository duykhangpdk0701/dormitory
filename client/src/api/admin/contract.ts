import IContract from "@/interfaces/Contract";
import queryString from "query-string";
import axiosClient from "../axiosClient";

const adminContractAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IContract[]> => {
    const url = "/contract";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IContract> => {
    const url = `/contract/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    roomId: string,
    staffId: string,
    civilianId: string,
    totalPrice: number
  ): Promise<IContract> => {
    const url = "/contract/store";
    const res = await axiosClient.post(url, {
      roomId,
      staffId,
      civilianId,
      totalPrice,
    });
    return res.data;
  },

  update: async (
    id: string,
    roomId: string,
    staffId: string,
    civilianId: string,
    totalPrice: number
  ): Promise<IContract> => {
    const url = `/contract/${id}`;
    const res = await axiosClient.put(url, {
      roomId,
      staffId,
      civilianId,
      totalPrice,
    });
    return res.data;
  },
};

export default adminContractAPI;
