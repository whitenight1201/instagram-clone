export type TPostView = 'gridView' | 'listView';
export interface IPost {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar?: any;
  };
  file?: any;
  likecnt: number;
  liketype?: boolean;
  // comments: IComment[];
  // shares: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  _id: string,
  commentary: string,
  post: string,
  user:{
    _id:string,
    username:string
  },
  createdAt: Date,
  updatedAt: Date,
}

export interface IPostData {
  post: IPost;
  comments: IComment[]
}
