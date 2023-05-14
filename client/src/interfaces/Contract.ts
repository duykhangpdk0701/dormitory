import ICivilian from "./Civilian";
import IRoom from "./Room";
import IStaff from "./Staff";

interface IContract {
  _id: string;
  roomId: string;
  staffId: string;
  civilianId: string;
  images: string[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  room: IRoom;
  staff: IStaff;
  civilian: ICivilian;
}

export default IContract;
