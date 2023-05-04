import ICivilian from "./Civilian";

interface IViolation {
  _id: string;
  title: string;
  description: string;
  civilianId: string;
  status: string;
  processing: string;
  createdAt: string;
  updatedAt: string;
  civilian: ICivilian;
}

export default IViolation;
