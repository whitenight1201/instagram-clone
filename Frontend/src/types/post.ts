export type TPostView = 'gridView' | 'listView';
import { IComment } from "./comment";
export interface IPost {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  file?: any;
  likecnt: number;
  comments: IComment[];
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostData {
  post: IPost;
  comments: IComment[]
}
