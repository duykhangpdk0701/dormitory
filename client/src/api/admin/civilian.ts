import ICivilian from "@/interfaces/Civilian";
import axiosClient from "../axiosClient";

const adminCivilian = {
  getList: async (): Promise<ICivilian[]> => {
    const url = "civilian";
    const res = await axiosClient.get(url);
    return res.data;
  },
};
export default adminCivilian;
