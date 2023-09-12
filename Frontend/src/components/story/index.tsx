import React from "react";
import { IStory } from "../../types/story";

interface IProps {
  story: IStory;
}

const Story: React.FC<IProps> = (props) => {
  const { story } = props;
  const { user } = story;
  return (
    <div className="flex flex-col justify-center items-center px-1">
      <div className="flex justify-center items-center w-[66px] h-[66px] rounded-full bg-gradient-to-b from-pink-500 via-red-500 to-yellow-500 p-1">
        <div className="flex h-full w-full items-center justify-centent back">
          <img
            src={user.dp}
            className="w-full rounded-full border-2 border-white"
            alt="story"
          />
        </div>
      </div>

      <p className="truncate w-[66px] text-center text-black font-sans font-normal text-[12px]">
        {user.fullname}
      </p>
    </div>
  );
};

export default Story;
