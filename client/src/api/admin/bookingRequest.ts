import queryString from "query-string";
import axiosClient from "../axiosClient";

const adminBookingRequest = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<any[]> => {
    const url = "/bookingRequest";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  cancel: async (id: string) => {
    const url = `/bookingRequest/${id}/cancel`;
    const res = await axiosClient.put(url);
    return res;
  },

  accepted: async (id: string) => {
    const url = `/bookingRequest/${id}/accepted`;
    const res = await axiosClient.put(url);
    return res;
  },
};

export default adminBookingRequest;
