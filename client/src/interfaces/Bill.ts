import ICivilian from "./Civilian";
import IRoom from "./Room";
import IService from "./Service";

interface IBill {
  _id: string;
  services: IService[];
  roomId: string;
  civilianId: string;
  totalPrice: number;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  room: IRoom;
  civilian: ICivilian;
  serviceUsage: any[];
  serviceUsage2: any[];
}

export default IBill;
