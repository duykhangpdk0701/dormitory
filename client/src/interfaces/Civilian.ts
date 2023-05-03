import IAddress from "./Address";
import IAccount from "./Account";

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
}

export default ICivilian;
