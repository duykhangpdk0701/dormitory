import axiosClient from "./axiosClient";

const bookingRequestAPI = {
  create: async (
    firstname: string,
    lastname: string,
    studentId: string,
    email: string,
    phone: string,
    dateOfBirth: string,
    priority: string,
    province: string,
    district: string,
    street: string
  ) => {
    const url = "/bookingRequest/store";
    const res = await axiosClient.post(url, {
      firstname,
      lastname,
      studentId,
      email,
      phone,
      dateOfBirth,
      priority,
      province,
      district,
      street,
    });
    return res;
  },
};

export default bookingRequestAPI;
