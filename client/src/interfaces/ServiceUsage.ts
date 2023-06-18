import ICivilian from "./Civilian";
import IService from "./Service";

interface IServiceUsage {
  _id: string;
  serviceId: string;
  civilianId: string;
  description: string;
  totalPrice: number;
  deleted: boolean;
  createdAt: string;
  service: IService;
  civilian: ICivilian;
}

export default IServiceUsage;
