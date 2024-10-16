import { TUser } from "./user.type";

export interface TPost {
  [x: string]: any;
  _id: string;
  user: TUser;
  images: string[];
  title: string;
  description: string;
  comments: any[];
  status: string;
  category: string;
  reportCount: number;
  likes: any[];
  dislikes: any[];
  isDeleted: boolean;
  report: any[];
  createdAt: string;
  updatedAt: string;
}
