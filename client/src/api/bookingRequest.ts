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
    street: string,
    images: File[]
  ) => {
    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("studentId", studentId);
    data.append("email", email);
    data.append("phone", phone);
    data.append("dateOfBirth", dateOfBirth);
    data.append("priority", priority);
    data.append("province", province);
    data.append("district", district);
    data.append("street", street);
    images.forEach((value) => {
      data.append("image[]", value);
    });
    const url = "/bookingRequest/store";
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axiosClient.post(url, data, config);
    return res.data;
  },
};

export default bookingRequestAPI;
