import ICivilian from "@/interfaces/Civilian";
import axiosClient from "../axiosClient";
import queryString from "query-string";

const adminCivilian = {
  getList: async (
    search?: string,
    limit: number = 5,
    page: number = 0
  ): Promise<ICivilian[]> => {
    const url = "/civilian";
    const searchUrl = queryString.stringifyUrl(
      { url, query: { search, limit, page: page + 1 } },
      { arrayFormat: "index" }
    );
    const res = await axiosClient.get(searchUrl);
    return res.data;
  },
};
export default adminCivilian;
