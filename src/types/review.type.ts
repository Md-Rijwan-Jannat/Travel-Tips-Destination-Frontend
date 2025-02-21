import { TUser } from "./user.type";

export interface TReview {
  _id: string;
  user: TUser;
  quote: string;
  rating: number;
  variant: string;
  createdAt: string;
  updatedAt: string;
}
