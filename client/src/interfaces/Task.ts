import IAccount from "./Account";
import IStaff from "./Staff";

interface ITask {
  _id: string;
  staffId: string;
  staff: IStaff;
  description: string;
  dateAssign: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export default ITask;
