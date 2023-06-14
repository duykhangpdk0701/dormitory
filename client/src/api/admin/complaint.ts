import IComplaint from "@/interfaces/Complaint";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminComplaintAPI = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<IComplaint[]> => {
    const url = "/complaint";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  getById: async (id: string): Promise<IComplaint> => {
    const url = `/complaint/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  create: async (name: string, desc: string): Promise<IComplaint> => {
    const url = "/complaint/store";
    const res = await axiosClient.post(url, { name, description: desc });
    return res.data;
  },
};

export default adminComplaintAPI;
