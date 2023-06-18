import IBill from "@/interfaces/Bill";
import axiosClient from "./axiosClient";

const billAPI = {
  getByCivilianId: async (civilianId: string): Promise<IBill[]> => {
    const url = `/bill?civilianId=${civilianId}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IBill> => {
    const url = `/bill/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  payWithPaypal: async (id: string): Promise<IBill> => {
    const url = `/bill/${id}/paid/paypal`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default billAPI;
