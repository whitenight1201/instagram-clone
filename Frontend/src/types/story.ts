
export interface IStory {
    _id: string;
    user: {
      _id: string;
      fullname: string;
      dp?: string;
    };
    createdAt: Date;
  }