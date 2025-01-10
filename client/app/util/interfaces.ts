import React, { Dispatch, SetStateAction } from "react";
import { BreadCrumbItemProps, Business, Category, Column, HttpMethod, ManagementUser, SelectChipsData, SelectItemProps, TeamClient, TileTitle, TileURL, User } from "./types";

export interface SearchParams {
  search: string;
  size: number;
  page: number;
  sortField: number;
  sortOrder: number;
}

export interface DefaultProps {
  id?: string
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[],
  name: string
}

export interface Client {
  clientId?: string;
  userId?: string,
  firstName?: string | unknown,
  lastName?: string | unknown,
  email?: string | unknown,
  phoneNumber?: string | unknown;
  status?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  type?: string;
  taxNumber?: string | unknown;
  whoAdded?: string | null;
  whoUpdated?: string | null;
  whenAdded?: string | null;
  ts?: string | null;
}

export interface ClientDataResponse extends Client {
  categories: Category[],
  teams: User[],
  businesses: Business[]
}

export interface ClientRequest extends Client {
  categories: Category[],
  teams: User[],
  tasks: Tasks
} 

export interface ClientData extends DefaultProps {
  id?: string;
  company: React.ReactNode,
  category: React.ReactNode, 
  name: string,
  teamAssigned: React.ReactNode,
  status?: string
}

export interface ClientResponse {
  clients: ClientDataResponse[]
}


export interface Params {
  params?: Record<string, string | number | boolean | string[] | undefined>
}

export interface FetchOption<T> extends Params{
  method: HttpMethod;
  url: string;
  body?: T;
  token?: string | null
}

export interface ManagementUsersResponse {
  users: ManagementUser[]
}

export interface BreadCrumbProps {
  items: BreadCrumbItemProps[]
}

export interface ButtonIconProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export interface SearchBarProps<T> {
  placeHolder?: string;
  initialInput: string;
  onClick: (e: string) => void;
  onChange: (e: string) => void;
}

export interface TitleProps {
  name: string;
  sub?: string;
  textStyle?: string;
  containerStyle?: string;
}

export interface TileProps {
  title: TileTitle;
  url: TileURL;
}

export interface UseQueryParameterHooksProps<T> {
  initialQueryParams?: Record<string, any>;
}

export interface MenuProps {
  name: string;
  link: string;
};

export interface MenuItem {
  name: string;
  link: string;
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>>;
};

export interface SidebarProps {
  role?: string;
};

export interface ClientComponentProps {
  data: ClientData[]
}

export interface InputFieldProps {
  id: string;
  label: string;
  value?: string;
  name: string;
  placeHolder: string;
  helperText: string;
  error: boolean;
  type?: string;
  containerStyle?: string;
  inputStyle?: string;
  onChange: (value: string) => void;
}

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  submitLabel: string;
  cancelLabel?: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export interface SelectProps {
  selected: SelectItemProps | undefined;
  options?: SelectItemProps[]
  onSelect?: (value: SelectItemProps) => void;
  label: string;
  helperText?: string;
  error?: boolean;
}

export interface MutipleSelectProps {
  selected?: SelectItemProps[];
  options?: SelectItemProps[];
  onSelect?: (selectedValues: SelectItemProps[]) => void;
  label: string;
  helperText?: string;
  error?: boolean;
}

export interface ClientInformationProps {
  teamsData: SelectItemProps[];
  clientData: SelectItemProps[];
  businessData?: SelectItemProps[];
  setCategories?: Dispatch<SetStateAction<SelectItemProps[]>>
  accountant?: SelectItemProps | undefined;
  categories?: SelectItemProps[];
  setAccountant?: Dispatch<SetStateAction<SelectItemProps | undefined>>
  // ownerInformation: OwnerInformation;
}

export interface ClientProfileProps extends ClientInformationProps{
}

export interface CategoryResponse {
  categories: Category[];
}

export interface Tasks {

}

export interface BusinessInformationProps {
  business: SelectItemProps;
  handleDeleteBusiness: (business: SelectItemProps) => void;
  handleUpdateBusiness: (business: SelectItemProps) => void;
}

export interface OwnerInformation {
  firstName: string;
  lastName: string;
  payerTaxNumber: string;
  email: string;
  phoneNumber: string;
}

export interface CreateClientRequest extends Client {
  businesses: Business[];
  categories: Category[];
  teams: TeamClient[]
}

export interface SubmittedData {
  [key: string]: string | number | unknown; // Dynamic keys must be strings
}

export interface TeamsListProps {
  data: User[]
}

export interface SelectChipsProps {
  data: SelectChipsData[];
  label: string;
  dropdownClassName?: string;
}

export interface ActionButtonProps {
  label: string;
  isLoading: boolean;
  type: "submit" | "reset" | "button" | undefined;
  buttonStyle?: string;
}

export interface DropDownArrowProps {
  isOpen: boolean;
  handleArrow: () => void; 
}

export interface ButtonLinkProps {
  handleClick: () => void;
  label: string;
  containerStyle?: string;
}

export interface BusinessesResponse {
  businesses: Business[];
}

export interface SpinnerProps {
  isLoading: boolean;
}