import IRoomType from "./RoomTypet";

interface IRoom {
  _id: string;
  name: string;
  description: string;
  numberPeople: number;
  numberBed: number;
  area: number;
  length: number;
  width: number;
  floor: number;
  price: number;
  roomType: IRoomType;
  images: File[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export default IRoom;
