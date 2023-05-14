import IAccount from "./Account";
import IAddress from "./Address";

interface IStaff {
  _id: string;
  accountId: string;
  account: IAccount;
  job: string;
  address: IAddress;
  salary: number;
  isWorking: boolean;
  dateStart: string;
  createdAt: string;
  updatedAt: string;
}

export default IStaff;
