import IPriority from "./Priority";

interface IBookingRequest {
  _id: string;
  firstname: string;
  lastname: string;
  studentId: string;
  email: string;
  phone: string;
  gender: string;
  images: string[];
  dateOfBirth: string;
  priority: IPriority;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
}
export default IBookingRequest;
