import IAccount from "./Account";

interface IStaff {
  _id: string;
  accountId: string;
  account: IAccount;
  job: string;
  address: string;
  salary: number;
  isWorking: boolean;
  dateStart: string;
  createdAt: string;
  updatedAt: string;
}

export default IStaff;
