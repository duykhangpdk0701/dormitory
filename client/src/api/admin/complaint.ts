import IComplaint from "@/interfaces/Complaint";
import axiosClient from "../axiosClient";

const adminComplaintAPI = {
  getList: async (): Promise<IComplaint[]> => {
    const url = "/complaint";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<IComplaint> => {
    const url = `/complaint/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, desc: string): Promise<IComplaint> => {
    const url = "/complaint/store";
    const res = await axiosClient.post(url, { name, description: desc });
    return res.data;
  },
};

export default adminComplaintAPI;
