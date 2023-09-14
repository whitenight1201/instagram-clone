import React, { useCallback } from "react";
import PostContainer from "../PostContainer/PostContainer";
import Story from "../../components/Story";
import { storiesData } from "../../database";

import useResetAndFetch from "../../store/posthooks/useResetAndFetch";
import useInfiniteScroll from "../../store/posthooks/useInfiniteScroll";
import { fetchPosts } from "../../store/slices/post";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const NewsFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, currentPage, loading, hasMore } = useAppSelector(
    (state) => state.posts
  );

  // We reset posts and load the first page when the route changes
  useResetAndFetch(1);

  // Scrolling processing
  const handleScroll = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchPosts(currentPage + 1));
      // console.log("postsData: " + posts)
    }
  }, [dispatch, currentPage, loading, hasMore]);

  // Adding a scrolling handler using the created hook
  useInfiniteScroll(handleScroll);

  return (
    <div className="w-full h-full">
      {/* Story Section */}
      <div className="flex w-full gap-2 items-center overflow-hidden cursor-pointer py-[17px] pl-5 bg-white">
        {storiesData.length
          ? storiesData.map((story, idx) => <Story key={idx} story={story} />)
          : null}
      </div>

      {/* All posts */}
      <PostContainer postsView="listView" postsData={posts} loading={loading}/>
    </div>
  );
};

export default NewsFeed;
