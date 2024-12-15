import { TUser } from './user.type';

export interface TStory {
  _id: string;
  user: TUser;
  media: string;
  expiresAt: string;
  views: any[];
  createdAt: string;
  reactions: any[];
  __v: number;
}

export type ReactionType = 'like' | 'love' | 'laugh' | 'sad' | 'angry';

export interface TAllUserStory {
  user: TUser;
  stories: TStory[];
}
