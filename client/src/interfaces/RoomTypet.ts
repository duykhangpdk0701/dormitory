interface IRoomType {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  images: string[];
  __v: number;
}

export default IRoomType;
