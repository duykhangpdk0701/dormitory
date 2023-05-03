import IRoom from "./Room";

interface IDevice {
  _id: string;
  name: string;
  roomId: string;
  description: string;
  dateAdd: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  room: IRoom;
}

export default IDevice;
