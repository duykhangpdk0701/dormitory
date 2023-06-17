import IAddress from "./Address";

interface IUser {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  gender: string;
  permission: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default IUser;
