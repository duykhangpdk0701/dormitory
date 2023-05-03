interface IAddress {
  _id: string;
  street: string;
  district: string;
  province: string;
  createdAt: string;
  updatedAt: string;
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
