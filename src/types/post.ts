import { UserInfo } from './user';

export interface Cafe {
  id: string;
  displayName: string;
}

export interface Comment {
  id?: string;
  postId: string;
  userId: string;
  userImage: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id?: string;
  userId: string;
  userImage: string;
  place?: Cafe;
  tags: UserInfo[];
  username: string;
  content: string;
  likes?: number;
  likedByCurrentUser?: string[];
  comments?: Comment[];
  photoUrls?: string[];
  videoUrl?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt?: string;
}
