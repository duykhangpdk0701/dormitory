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
  getListByUserId: async (id: string) => {},
};

export default complaintAPI;
