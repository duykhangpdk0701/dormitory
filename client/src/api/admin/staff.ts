import IStaff from "@/interfaces/Staff";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminStaffAPI = {
  getList: async (
    search?: string,
    limit?: number,
    page?: number
  ): Promise<IStaff[]> => {
    const url = "/staff";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page ? page : undefined } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IStaff> => {
    const url = `/staff/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (
    dataStart: Date,
    street: string,
    district: string,
    province: string,
    salary: number,
    firstname: string,
    lastname: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    job: string
  ): Promise<IStaff> => {
    const url = "/staff/store";
    const res = await axiosClient.post(url, {
      dataStart,
      street,
      district,
      province,
      salary,
      firstname,
      lastname,
      dateOfBirth,
      email,
      phone,
      job,
    });
    return res.data;
  },

  update: async (
    id: string,
    dataStart: Date,
    street: string,
    district: string,
    province: string,
    salary: number,
    firstname: string,
    lastname: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    job: string
  ): Promise<IStaff> => {
    const url = `/staff/${id}`;
    const res = await axiosClient.put(url, {
      dataStart,
      street,
      district,
      province,
      salary,
      firstname,
      lastname,
      dateOfBirth,
      email,
      phone,
      job,
    });
    return res.data;
  },
};

export default adminStaffAPI;
