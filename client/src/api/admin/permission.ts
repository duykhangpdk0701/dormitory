import axiosClient from "../axiosClient";

const adminPermission = {
  getList: async (): Promise<IPermission[]> => {
    const url = "/permisson";
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, description: string): Promise<IPermission> => {
    const url = "/permission";
    const res = await axiosClient.post(url, { name, description });
    return res.data;
  },

  getById: async (id: string): Promise<IPermission> => {
    const url = `/permisson/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default adminPermission;
