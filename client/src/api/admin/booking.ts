import IBooking from "@/interfaces/Booking";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminBooking = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 1
  ): Promise<IBooking[]> => {
    const url = "/booking";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IBooking> => {
    const url = `/booking/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  paid: async (id: string): Promise<IBooking> => {
    const url = `/booking/${id}/paid`;
    const res = await axiosClient.put(url);
    return res.data;
  },

  cancel: async (id: string): Promise<IBooking> => {
    const url = `/booking/${id}/cancel`;
    const res = await axiosClient.put(url);
    return res.data;
  },

  deposit: async (id: string): Promise<IBooking> => {
    const url = `/booking/${id}/deposit`;
    const res = await axiosClient.put(url);
    return res.data;
  },
};

export default adminBooking;
