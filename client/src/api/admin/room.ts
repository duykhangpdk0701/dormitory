import IRoom from "@/interfaces/Room";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminRoomAPI = {
  getList: async (
    search?: string,
    limit?: number,
    page?: number
  ): Promise<IRoom[]> => {
    const url = "/room";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page ? page + 1 : undefined } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IRoom> => {
    const url = `/room/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    name: string,
    desc: string,
    isActive: boolean,
    numberPeople: number,
    numberBed: number,
    area: number,
    length: number,
    width: number,
    floor: number,
    price: number,
    images: File[],
    roomType: string
  ): Promise<IRoom> => {
    const data = new FormData();
    data.append("name", name);
    data.append("description", desc);

    data.append("isActive", isActive ? "1" : "0");
    data.append("numberPeople", numberPeople.toString());
    data.append("numberBed", numberBed.toString());
    data.append("area", area.toString());
    data.append("length", length.toString());
    data.append("width", width.toString());
    data.append("floor", floor.toString());
    data.append("price", price.toString());
    images.forEach((value) => {
      data.append("images[]", value);
    });
    data.append("roomType", roomType);
    const url = "/room/store";
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axiosClient.post(url, data, config);
    return res.data;
  },
};

export default adminRoomAPI;
