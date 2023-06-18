import ICivilian from "./Civilian";

interface IComplaint {
  _id: string;
  title: string;
  description: string;
  name: string;
  civilianId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  civilian: ICivilian;
}

export default IComplaint;
