export interface User {
  email: string;
  password: string;
}

export interface Message {
  message: string;
}

export interface Category {
  _id?: string;
  name: string;
  user?: string;
  imageSrc?: string;
}
export interface Position {
  _id?: string;
  name: string;
  cost: number;
  category: string;
  user?: string;
  quantity?: number;
}

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
}

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface Filter {
  start?: Date;
  end?: Date;
  order?: number;
}

export interface OverviewPage {
  orders: OverviewPageItem;
  revenues: OverviewPageItem;
}

export interface OverviewPageItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}