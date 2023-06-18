import IService from "@/interfaces/Service";
import axiosClient from "./axiosClient";
import queryString from "query-string";

const serviceUsageAPI = {
  getAll: async (): Promise<IService[]> => {
    const url = "/serviceUsage";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getByUserId: async (
    civilianId: string,
    search?: string,
    limit?: number,
    page?: number
  ): Promise<IService[]> => {
    const url = `/serviceUsage?civilianId=${civilianId}`;
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page ? page : undefined } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },

  create: async (
    serviceId: string,
    civilianId: string,
    description: string
  ): Promise<IService> => {
    const url = "/serviceUsage/store";
    const res = await axiosClient.post(url, {
      serviceId,
      civilianId,
      description,
    });
    return res.data;
  },

  getById: async (id: string): Promise<IService> => {
    const url = `/serviceUsage/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default serviceUsageAPI;
