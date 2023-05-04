import IDevice from "@/interfaces/Device";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminDeviceAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IDevice[]> => {
    const url = "/device";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IDevice> => {
    const url = `/device/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    name: string,
    desc: string,
    roomId: string,
    dateAdd: Date,
    price: number
  ): Promise<IDevice> => {
    const url = "/device/store";
    const res = await axiosClient.post(url, {
      name,
      description: desc,
      roomId,
      dateAdd,
      price,
    });
    return res.data;
  },
};

export default adminDeviceAPI;
