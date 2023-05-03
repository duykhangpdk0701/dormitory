interface IAdminNavItem {
  id: string;
  title: string;
  caption?: string;
  type: string;
  url?: string;
  target?: boolean;
  icon?: any;
  external?: boolean;
  disable?: boolean;
  children?: IAdminNavItem[];
}

export default IAdminNavItem;
