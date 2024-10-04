import { TUser } from "./user.type";

export interface TPaymentData {
  user: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  customerCountry: string;
}

export interface TPayment {
  _id: string;
  transitionId: string;
  user: TUser;
  amount: number;
  customerEmail: string;
  customerName: string;
  customerNumber: string;
  customerAddress: any;
  customerCountry: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
