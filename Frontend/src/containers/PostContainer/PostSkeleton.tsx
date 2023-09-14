import React from "react";
import "./PostSkeleton.css";
const PostSkeleton = () => {
  return (
    <div className="flex flex-col w-full lg:h-[500px] md:h-[400px] sm:h-[300px] h-200px shadow bg-white ">
      {/* Author Title */}
      <div className="skeletonimage animate-shine w-full h-[8%] border-b-2 border-gray-100 bg-slate-200"></div>
      {/* Image */}
      <div className="skeletonimage animate-shine w-full h-[70%] border-b-2 border-gray-100"></div>

      {/* Icons, Likes, Comments, Time */}
      <div className="skeletonimage animate-shine w-full h-[14%] border-b-2 border-gray-100"></div>

      {/* Add Comment */}
      <div className="skeletonimage animate-shine w-full h-[8%] border-b-2 border-gray-100"></div>
    </div>
  );
};

export default PostSkeleton;
