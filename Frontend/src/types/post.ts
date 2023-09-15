export type TPostView = 'gridView' | 'listView';
export interface IPost {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar?: any;
  };
  filename?: any;
  type:string,
  likecnt: number;
  liketype?: boolean;
  selectpostlikeflag?:boolean;
  commentcnt:number;
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


export interface ICommentaryParms {
  post_id: string;
  commentary: string;
}

export interface ILikePostParms {
  post_id: string;
  like: boolean;
}