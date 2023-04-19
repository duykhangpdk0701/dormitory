import axiosClient from "./axiosClient";

const bookingRequestAPI = {
  create: async (
    firstname: string,
    lastname: string,
    studentId: string,
    email: string,
    phone: string,
    dateOfBirth: string
  ) => {
    const url = "/bookingRequest/store";
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
};

export default bookingRequestAPI;
