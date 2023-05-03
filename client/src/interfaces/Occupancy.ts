import ICivilian from "./Civilian";
import IRoom from "./Room";

interface IOccupancy {
  _id: string;
  roomId: string;
  civilianId: string;
  createdAt: string;
  updatedAt: string;

  room: IRoom;
  civilian: ICivilian;
}

export default IOccupancy;
