import React, { useState } from "react";
import { IPostData } from "../../types/post";
import Comment from "../Comment";
import moment from "moment";
interface IProps {
  postData: IPostData;
}

const Post: React.FC<IProps> = (props) => {
  const { postData } = props;
  const { author } = postData.post;

  const [commentshownumber, setCommnetshownumber] = useState<number>(2);

  const handleShowAllCommnets = () => {
    setCommnetshownumber(postData.comments.length);
  };

  return (
    <div className="w-full shadow bg-white">
      <div className="flex items-center space-x-5 p-2.5 pl-4">
        {author.avatar ? (
          <div className="w-10 h-10">
            <img
              src={process.env.REACT_APP_BASE_URL + author.avatar}
              className="w-full h-full rounded-full"
              alt="author"
            />
          </div>
        ) : (
          <div className="w-10 h-10">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="w-full h-full rounded-full"
            />
          </div>
        )}

        <div className="flex-grow">
          <p className="font-semibold text-sm text-gray-700">
            {author.username}
          </p>
        </div>
        <div className="w-8 h-8">
          <button className="w-full h-full hover:bg-gray-100 rounded-full text-gray-600 focus:outline-none">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
      {/* Image */}
      {postData.post.file ? (
        <div className="w-full max-h-100">
          <img
            src={process.env.REACT_APP_BASE_URL + postData.post.file}
            alt="postimage"
            className="w-full h-76 max-h-100 object-cover"
          />
        </div>
      ) : (
        <div className="border-b-[1px] border-gray-100"></div>
      )}

      <div className="w-full flex flex-col px-4">
        {/* Icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="focus:outline-none flex items-center justify-center w-10 h-10 rounded-full bg-white">
              <i style={{ fontSize: 24 }} className="fas fa-heart"></i>
            </button>
            <button className="focus:outline-none flex items-center justify-center w-10 h-10 rounded-full bg-white">
              <i style={{ fontSize: 24 }} className="fas fa-comment"></i>
            </button>
            <button className="focus:outline-none flex items-center justify-center w-10 h-10 rounded-full bg-white">
              <i style={{ fontSize: 24 }} className="fas fa-paper-plane"></i>
            </button>
          </div>
          <div className="flex items-center">
            <button className="focus:outline-none flex items-center justify-center w-10 h-10 rounded-full bg-white">
              <i style={{ fontSize: 24 }} className="fas fa-bookmark"></i>
            </button>
          </div>
        </div>
        {/* Likes */}
        <div className="flex w-8 h-4 space-x-1 pb-6">
          <p>{postData.post.likecnt}</p>
          <p>Likes</p>
        </div>
        {/* Caption-content */}
        <div className="flex flex-col gap-1">
          <div className="flex text-sm justify-between">
            <p className="font-semibold">{author.username}</p>
            <p className="felx flex-grow truncate pl-2 text-ellipsis">
              {postData.post.content}
            </p>
            <button className="flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-500 focus:outline-none">
              more
            </button>
          </div>
        </div>
        {/* Comment's Show */}
        <div>
          <div className="flex flex-col w-full">
            {postData.comments.length ? (
              postData.comments
                .slice(0, commentshownumber)
                .map((comment, idx) => <Comment key={idx} comment={comment} />)
            ) : (
              <p>No comments yet!</p>
            )}
          </div>
          <button
            className="flex text-sm hover:bg-gray-100 rounded-md text-gray-500 focus:outline-none"
            onClick={handleShowAllCommnets}
          >
            View all {postData.comments.length} comments
          </button>
        </div>
        {/* Time */}
        <div className="flex-grow pb-4">
          <span className="text-xs font-thin text-gray-400">
            {moment(postData.post.createdAt).fromNow()}
          </span>
        </div>
      </div>
      {/* Add Comment */}
      <div className="flex py-[6px] justify-between px-4 border-t-[1px] border-gray-100">
        <img
          className="flex w-6 h-6 my-2 mr-4"
          src="images/img_emoji.svg"
          alt="Emoji"
        ></img>
        <input
          type="text"
          className="flex-grow focus:outline-none text-gray-500"
          placeholder="Add a comment..."
        />
        <button className="flex justify-center items-center text-blue-700 hover:font-semibold">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
