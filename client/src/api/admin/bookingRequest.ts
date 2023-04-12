import axiosClient from "../axiosClient";

const adminBookingRequest = {
  getList: async (): Promise<any[]> => {
    const url = "/bookingRequest";
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    firstname: string,
    lastname: string,
    studentId: string,
    email: string,
    phone: string,
    dateOfBirth: string
  ) => {
    const url = "/bookingRequest";
    const res = await axiosClient.post(url, {
      firstname,
      lastname,
      studentId,
      email,
      phone,
      dateOfBirth,
    });
    return res;
  },

  cancel: async (id: string) => {
    const url = `/bookingRequest/${id}/cancel`;
    const res = await axiosClient.put(url);
    return res;
  },

  accepted: async (id: string) => {
    const url = `/bookingRequest/${id}/accepted`;
    const res = await axiosClient.put(url);
    return res;
  },
};

export default adminBookingRequest;
