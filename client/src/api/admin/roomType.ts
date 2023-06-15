import IRoomType from "@/interfaces/RoomTypet";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminRoomTypeAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 1
  ): Promise<IRoomType[]> => {
    const url = "/roomType";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);

    return res.data;
  },

  getById: async (id: string): Promise<IRoomType> => {
    const url = `/roomType/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    name: string,
    desc: string,
    price: number,
    images: File[]
  ): Promise<IRoomType> => {
    const url = `/roomType/store`;
    const res = await axiosClient.post(url, {
      name,
      description: desc,
      price,
      images,
    });
    return res.data;
  },
  update: async (
    id: string,
    name: string,
    desc: string,
    price: number,
    images: File[]
  ): Promise<IRoomType> => {
    const url = `/roomType/${id}`;
    const res = await axiosClient.put(url, {
      name,
      description: desc,
      price,
      images,
    });
    return res.data;
  },
};

export default adminRoomTypeAPI;
