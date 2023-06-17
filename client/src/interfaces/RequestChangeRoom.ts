import IRoomType from "./RoomTypet";
import IUser from "./User";

interface IRequestChangeRoom {
  _id: string;
  accountId: string;
  roomType: IRoomType;
  reason: string;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;

  user: IUser;
}

export default IRequestChangeRoom;
