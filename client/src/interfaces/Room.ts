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
  roomType: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export default IRoom;
