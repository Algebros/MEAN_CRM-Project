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
  user?: string;
  name: string;
  category: string;
  cost: number;
}

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}