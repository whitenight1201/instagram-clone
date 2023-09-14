import React from "react";
import { IComment } from "../../types/post";

interface IProps {
  comment: IComment;
}

const Comment: React.FC<IProps> = (props) => {
  const { comment } = props;
  const { user } = comment;
  return (
    <div className="flex w-full text-sm">
      <p className="font-semibold text-sm text-gray-700">{user.username}</p>
      <p className="felx flex-grow truncate pl-2 text-ellipsis">
        {comment.commentary}
      </p>
    </div>
  );
};

export default Comment;
