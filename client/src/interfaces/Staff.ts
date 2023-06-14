import IAccount from "./Account";
import IAddress from "./Address";
import IJob from "./Job";

interface IStaff {
  _id: string;
  accountId: string;
  account: IAccount;
  job: IJob;
  address: IAddress;
  salary: number;
  isWorking: boolean;
  dateStart: string;
  createdAt: string;
  updatedAt: string;
}

export default IStaff;
