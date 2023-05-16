import IUser from "./User";

export interface IConversation {
  _id: string;
  title: string;
  userId: string[];
  createdAt: string;
  updatedAt: string;
  user: IUser[];
}

export interface IMessage {
  _id: string;
  conversation: string;
  user: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
