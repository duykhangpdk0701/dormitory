import { IConversation } from "@/interfaces/Chat";
import axiosClient from "./axiosClient";

const chatAPI = {
  getConversationByUserId: async (userId: string): Promise<IConversation[]> => {
    const url = `/conversation?userId=${userId}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getMessageByConversationId: async (conversationId: string) => {
    const url = `/message?conversationId=${conversationId}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};

export default chatAPI;
