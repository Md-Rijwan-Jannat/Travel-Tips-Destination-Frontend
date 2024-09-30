import { TUser } from "./user.type";

export interface TPost {
  _id: string;
  user: TUser;
  images: string[];
  title: string;
  description: string;
  comments: any[];
  status: string;
  reportCount: number;
  likes: any[];
  dislikes: any[];
  isDeleted: boolean;
  report: any[];
  createdAt: string;
  updatedAt: string;
}
