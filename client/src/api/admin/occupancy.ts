import axiosClient from "../axiosClient";

const adminOccupancyAPI = {
  getList: async (): Promise<any[]> => {
    const url = "/occupancy";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async (id: string): Promise<any> => {
    const url = `/occupancy/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    roomId: string,
    civilianId: string,
    checkInDate: string,
    totalPrice: string
  ): Promise<any> => {
    const url = "/occupancy/store";
    const res = await axiosClient.post(url, {
      roomId,
      civilianId,
      checkInDate,
      totalPrice,
    });
    return res.data;
  },
};

export default adminOccupancyAPI;
