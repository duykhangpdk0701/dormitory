import IBooking from "@/interfaces/Booking";
import axiosClient from "../axiosClient";

const adminBooking = {
  getList: async (): Promise<IBooking[]> => {
    const url = "/booking";
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default adminBooking;
