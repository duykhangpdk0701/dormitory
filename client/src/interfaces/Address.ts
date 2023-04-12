interface IAddress {
  address: string;
  phone: string;
  city_id: number;
  district_id: number;
  id: number;
  name: string;
  status: number;
  user_id: number;
  ward_id: number;
  parse_address_string: string;
}

export interface ICity {
  id: number;
  code: string;
  name: string;
  slug: string;
  geometry: null | any;
  center: string;
  color: string;
  bounding_box: string;
  order: null;
  status: number;
  pre: string;
  created_at: null | string;
  updated_at: null | string;
}

export interface IDistrict {
  id: number;
  city_id: number;
  code: string;
  name: string;
  slug: string;
  geometry: null | any;
  center: string;
  color: string;
  bounding_box: string;
  order: null;
  pre: string;
  status: number;
  created_at: null | string;
  updated_at: null | string;
}

export interface IWard {
  id: number;
  city_id: number;
  district_id: number;
  code: string;
  name: string;
  slug: string;
  geometry: null | any;
  center: string;
  color: string;
  bounding_box: string;
  order: null;
  pre: string;
  status: number;
  created_at: null | string;
  updated_at: null | string;
}

export default IAddress;
