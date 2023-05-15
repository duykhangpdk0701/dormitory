import IBill from "@/interfaces/Bill";
import queryString from "query-string";
import axiosClient from "../axiosClient";

const adminBillAPI = {
  getAll: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IBill[]> => {
    const url = "/bill";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IBill> => {
    const url = `/bill/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    roomId: string,
    civilianId: string,
    totalPrice: number
  ): Promise<IBill> => {
    const url = "/bill/store";
    const res = await axiosClient.post(url, { roomId, civilianId, totalPrice });
    return res.data;
  },

  update: async (
    id: string,
    roomId: string,
    civilianId: string,
    totalPrice: number
  ): Promise<IBill> => {
    const url = `/bill/${id}`;
    const res = await axiosClient.put(url, { roomId, civilianId, totalPrice });
    return res.data;
  },

  paid: async (id: string): Promise<IBill> => {
    const url = `/bill/${id}`;
    const res = await axiosClient.put(url);
    return res.data;
  },
};

export default adminBillAPI;
