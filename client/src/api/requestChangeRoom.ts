import axiosClient from "./axiosClient";

const requestChangeRoomeAPI = {
  create: async (accountId: string, roomType: string, reason: string) => {
    const url = "/requestChangeRoom/store";
    const res = await axiosClient.post(url, { accountId, roomType, reason });
    return res.data;
  },
};

export default requestChangeRoomeAPI;
