import IAddress from "./Address";

interface ILogin {
  success: boolean;
  messages: string;
  accessToken: string;
  user: {
    _id: string;
    username: string;
    password: string;
    permission: {
      _id: string;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    infor: {
      accountId: string;
      address: IAddress;
      createdAt: string;
      dateStart: string;
      isWorking: true;
      job: string;
      salary: number;
      updatedAt: string;
      _id: string;
    };
  };
}

export default ILogin;
