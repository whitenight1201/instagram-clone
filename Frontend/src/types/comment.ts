
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
