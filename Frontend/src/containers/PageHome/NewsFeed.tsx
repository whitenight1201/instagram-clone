import React from "react";
import PostContainer from "../PostContainer/PostContainer";
import Story from "../../components/Story";
import { storiesData } from "../../database";

const NewsFeed: React.FC = () => {
  return (
    <div className="w-full h-full">
      {/* Story Section */}
      <div className="flex w-full gap-2 items-center overflow-hidden cursor-pointer py-[17px] pl-5 bg-white">
        {storiesData.length
          ? storiesData.map((story, idx) => <Story key={idx} story={story} />)
          : null}
      </div>

      {/* All posts */}
      <PostContainer postsView="listView"/>
    </div>
  );
};

export default NewsFeed;
