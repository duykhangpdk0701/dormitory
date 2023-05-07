import IBooking from "@/interfaces/Booking";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminBooking = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IBooking[]> => {
    const url = "/booking";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
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
};

export default adminBooking;
