import IAddress from "./Address";
import IAccount from "./Account";
import IRoom from "./Room";

interface ICivilian {
  _id: string;
  accountId: string;
  address: IAddress;
  studentId: string;
  isStaying: boolean;
  dateStart: string;
  createdAt: string;
  updatedAt: string;
  account: IAccount;
  room: IRoom;
}

export default ICivilian;
