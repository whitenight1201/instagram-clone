import React from "react";
import Post from "../../components/Post";
import PostSkeleton from "./PostSkeleton";

import { IPostData, TPostView } from "../../types/post";

interface IProps {
  postsView?: TPostView;
  postsData: IPostData[];
  loading: boolean;
}

const PostContainer: React.FC<IProps> = (props) => {
  const { postsView, postsData, loading } = props;

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
          <>{!loading ? <p>No posts yet!</p> : <p></p>}</>
        )}

        {/* Placeholder output for the following pages*/}
        {loading && (
          <>
            {[...Array(5)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostContainer;
