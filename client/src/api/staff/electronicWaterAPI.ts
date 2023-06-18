import axiosClient from "../axiosClient";

const ElectronicWaterAPI = {
  create: async (roomId: string, numberStart: number, numberEnd: number) => {
    const url = "/electronicWater/store";
    const res = await axiosClient.post(url, { roomId, numberStart, numberEnd });
    return res.data;
  },
};

export default ElectronicWaterAPI;
