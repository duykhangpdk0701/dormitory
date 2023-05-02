import axiosClient from "../axiosClient";

const adminPermissionAPI = {
  getList: async (): Promise<ICivilian[]> => {
    const url = "/permission";
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, description: string): Promise<ICivilian> => {
    const url = "/permission/store";
    const res = await axiosClient.post(url, { name, description });
    return res.data;
  },

  getById: async (id: string): Promise<ICivilian> => {
    const url = `/permission/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default adminPermissionAPI;
