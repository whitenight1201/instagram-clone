
export interface IFollow {
  _id: string;
  user: {
    _id: string;
    username: string;
    dp?: string;
  };
  followers: number;
}
