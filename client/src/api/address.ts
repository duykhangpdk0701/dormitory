import IAddress from "@/interfaces/Address";
import axiosClient from "./axiosClient";

const addressAPI = {
  getList: async (): Promise<IAddress[]> => {
    const url = "/api/v1/address";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IAddress> => {
    const url = `/api/v1/address/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createNewAddress: async (
    name: string,
    address: string,
    phone: string,
    cityId: number,
    districtId: number,
    wardId: number
  ): Promise<any> => {
    const url = "api/v1/address";

    const reqData = {
      name,
      phone,
      city_id: cityId,
      district_id: districtId,
      ward_id: wardId,
      address,
    };

    const res = await axiosClient.post(url, reqData);

    return res.data;
  },

  updateAddress: async (
    id: string,
    name: string,
    address: string,
    phone: string,
    cityId: number,
    districtId: number,
    wardId: number
  ) => {
    const url = `api/v1/address/${id}`;

    const reqData = {
      name,
      phone,
      city_id: cityId,
      district_id: districtId,
      ward_id: wardId,
      address,
    };

    const res = await axiosClient.put(url, reqData);

    return res.data;
  },

  deleteAddressById: async (id: number): Promise<IAddress> => {
    const url = `api/v1/address/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};

export default addressAPI;
