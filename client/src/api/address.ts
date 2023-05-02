import IAddress from "@/interfaces/Address";
import axiosClient from "./axiosClient";

const addressAPI = {
  getList: async (): Promise<IAddress[]> => {
    const url = "address";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IAddress> => {
    const url = `address/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createNewAddress: async (
    street: string,
    district: string,
    provine: string
  ): Promise<any> => {
    const url = "address/store";

    const reqData = {
      street,
      district,
      provine,
    };

    const res = await axiosClient.post(url, reqData);

    return res.data;
  },
};

export default addressAPI;
