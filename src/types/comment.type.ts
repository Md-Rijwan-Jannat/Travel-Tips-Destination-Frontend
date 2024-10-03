import { TUser } from "./user.type";

export interface TComment {
  _id: string;
  user: TUser;
  post: string;
  text: string;
  images: any[];
  likes: any[];
  dislikes: any[];
  replies: any[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
