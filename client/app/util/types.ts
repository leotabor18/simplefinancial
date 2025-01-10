export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type TileURL = '/clients/active' | '/clients/inactive' | '/clients/create' | '/forms/submitted' | '/forms/my-forms' | '/forms/create';

export type TileTitle = 'Add New client' | 'Active Clients' | 'Inactive Clients' | 'Submitted Forms' | 'My Forms' | 'Add New Form';

export type RoleResponse = {
  orgCode: string;
  name: string 
}

export type User = {
  userId: string;
  firstName?: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  status: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  role: RoleResponse;
  country: string;
  whoAdded: string | null;
  whoUpdated: string | null;
  whenAdded: string | null;
}

export type Category = {
  categoryId?: number | string;
  name: string;
  description?: string;
  whoAdded?: string;
  whoUpdated?: string;
  whenAdded?: number;
  ts?: number;
}

export type Column<T> = {
  id: string;
  field: keyof T;
  label:  string;
  isSort: boolean;
  isHidden: boolean;
}

export type Business = {
  businessId?: number | string | undefined;
  name: string;
  taxNumber: string | undefined;
}

export type TeamClient = {
  teamClientId?: number;
  clientId?: string;
  userId: string | number | undefined;
}

export type SelectChipsData = {
  id?: number | string | undefined;
  name: string;
}

export type ManagementUser = {
  id: string;
  email: string;
  roles: string[];
  picture: string;
  full_name: string;
  joined_on: string;
  last_name: string;
  first_name: string;
}

export type BreadCrumbItemProps = {
  name: string;
  link: string
}

export type SelectItemProps = {
  value: string;
  label: string;
  id?: string | number;
  description?: string;
}
