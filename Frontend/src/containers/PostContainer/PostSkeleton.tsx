import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col w-full lg:h-[500px] md:h-[400px] sm:h-[300px] h-200px shadow bg-white animate-pulse ">
      {/* Author Title */}
      <div className="flex justify-between items-center w-full h-[8%] border-b-[1px] border-gray-100 pl-4">
        <div className="rounded-full bg-slate-200 w-8 h-8 space-x-4"></div>
        <div className="w-full h-8 mx-5 rounded-md bg-slate-200"></div>
      </div>
      {/* Image */}
      <div className="w-full h-[70%] border-b-[1px] border-gray-100 bg-slate-400"></div>

      {/* Icons, Likes, Comments, Time */}
      <div className="w-full h-[14%] border-b-[1px] border-gray-100 bg-slate-200"></div>

      {/* Add Comment */}
      <div className="w-full h-[8%] border-b-[1px] border-gray-100 bg-slate-200"></div>
    </div>
  );
};

export default PostSkeleton;
