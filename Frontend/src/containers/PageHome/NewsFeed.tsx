import React, { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";
import Story from "../../components/Story";
import { storiesData } from "../../database";
import { IPostData} from "../../types/post";
import { getallposts } from "../../services/post.service";

const NewsFeed: React.FC = () => {
  const [postsData, setPostData] = useState<IPostData[]>([]);

  useEffect(() => {
    getallposts(1, 10).then((response) => {
      console.log("data: ", response);
      setPostData(response);
    });
  }, []);

  return (
    <div className="w-full h-full">
      {/* Story Section */}
      <div className="flex w-full gap-2 items-center overflow-hidden cursor-pointer py-[17px] pl-5 bg-white">
        {storiesData.length
          ? storiesData.map((story, idx) => <Story key={idx} story={story} />)
          : null}
      </div>

      {/* All posts */}
      <PostContainer postsView="listView" postsData={postsData} />
    </div>
  );
};

export default NewsFeed;
