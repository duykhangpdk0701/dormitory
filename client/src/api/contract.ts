import axiosClient from "./axiosClient";

const contractAPI = {
  getListById: async (civilianId: string) => {
    const url = `/contract?civilianId=${civilianId}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default contractAPI;
