import IAddress from "./Address";

interface IUser {
  id: 19;
  name: string;
  email: string;
  token: null;
  roles: any[];
  permissions: [];
  role: string;
  avatar: string;
  reset_password_at: null | any;
  profile: null | any;
  multiple_address: IAddress[];
  address_default: {
    address: string;
    city_id: number;
    district_id: number;
    id: number;
    name: string;
    parse_address_string: string;
    status: number;
    user_id: number;
    ward_id: number;
  };
}

export default IUser;
