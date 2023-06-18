import IComplaint from "@/interfaces/Complaint";
import axiosClient from "./axiosClient";

const complaintAPI = {
  create: async (name: string, desc: string, civilianId: string) => {
    const url = "/complaint/store";
    const res = await axiosClient.post(url, {
      name,
      description: desc,
      civilianId,
    });
    return res.data;
  },
  getListByUserId: async (civilianId: string): Promise<IComplaint[]> => {
    const url = `/complaint?civilianId=${civilianId}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default complaintAPI;
