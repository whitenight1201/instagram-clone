import React from "react";
import { IFollow } from "../../../types/follwer";
interface IProps {
  follower: IFollow;
}

const Follower: React.FC<IProps> = (props) => {
  const { follower } = props;
  const { user } = follower;
  return (
    <div className="flex w-full items-center">
      <div className="w-8 h-8 mr-3">
        <img src={user.dp} className="rounded-full"></img>
      </div>
      <div className="flex-grow flex flex-col">
        <p className="text-sm font-normal text-black">{user.username}</p>
        <div className="text-xs font-normal text-gray-400">
          Followed by {user.username} + {follower.followers} more
        </div>
      </div>
      <button className="text-sm font-semibold hover:font-bold rounded-full text-blue-700 focus:outline-none">
        <p>Follow</p>
      </button>
    </div>
  );
};

export default Follower;
