import React from "react";
import { IPostData, TPostView } from "../../types/post";
import Post from "../../components/Post";

interface IProps {
  postsView?: TPostView;
  postsData: IPostData[];
}

const PostContainer: React.FC<IProps> = (props) => {
  const { postsView, postsData } = props;

  return (
    <div className="w-full h-full">
      <div
        className={`grid ${
          postsView === "gridView" ? "grid-cols-2" : "grid-cols-1"
        } gap-2`}
      >
        {postsData.length ? (
          postsData.map((post, idx) => <Post key={idx} postData={post} />)
        ) : (
          <p>No posts yet!</p>
        )}
      </div>
    </div>
  );
};

export default PostContainer;
