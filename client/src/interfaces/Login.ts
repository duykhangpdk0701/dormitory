interface ILogin {
  id: number;
  name: string;
  email: string;
  token: string;
  roles: string[];
  permissions: string[];
  role: string;
  partner_status: null | string;
  partner_reason: null | string;
  avatar: string;
  reset_password_at: null;
  profile: {
    user_id: number;
    code: null | string;
    phone: null | string;
    first_name: null | string;
    last_name: null | string;
    identify_number: null | string;
    profit_rate: null | string;
    bank_number: null | string;
    bank_name: null | string;
    city_id: null | string;
    district_id: null | string;
    ward_id: null | string;
    address: null | string;
    status_address_applied: null | string;
    active_status: null | string;
    created_at: string;
    updated_at: string;
  };
}

export default ILogin;
