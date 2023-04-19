interface IBookingRequest {
  _id: string;
  firstname: string;
  lastname: string;
  studentId: string;
  email: string;
  phone: string;
  images: string[];
  dateOfBirth: string;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
}
export default IBookingRequest;
