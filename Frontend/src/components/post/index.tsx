import React from "react";
import { IPost } from "../../types/post";
import moment from "moment";
interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = (props) => {
  const { post } = props;
  const { user } = post;
  return (
    <div className="w-full shadow bg-white">
      <div className="flex items-center space-x-5 p-2.5 pl-4">
        <div className="w-10 h-10">
          <img src={user.dp} className="w-full h-full rounded-full" alt="dp" />
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-sm text-gray-700">{user.fullname}</p>
        </div>
        <div className="w-8 h-8">
          <button className="w-full h-full hover:bg-gray-100 rounded-full text-gray-600 focus:outline-none">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
      {/* Image */}
      {post.image ? (
        <div className="w-full h-76 max-h-100">
          <img
            src={post.image}
            alt="postimage"
            className="w-full h-76 max-h-100 object-cover"
          />
        </div>
      ) : null}

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
        <div className="flex w-8 h-4 space-x-1">
          <p>{post.likes}</p>
          <p>Likes</p>
        </div>
        {/* Comments */}
        <div className="flex flex-col gap-1">
          <div className="flex text-sm justify-between pr-4">
            <p className="font-semibold">{user.fullname}</p>
            <p className="truncate">
              Imperdiet in sit rhoncus, eleifend tellus augue lectus potenti
              pellentesque
            </p>
            <button className="flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-500 focus:outline-none">
              more
            </button>
          </div>
          <button className="flex text-sm hover:bg-gray-100 rounded-md text-gray-500 focus:outline-none">
            View all 100 comments
          </button>
        </div>
        {/* Time */}
        <div className="flex-grow pb-4">
          <span className="text-xs font-thin text-gray-400">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
      </div>
      {/* Add Comment */}
      <div className="flex shadow py-[6px] justify-between px-4">
        <img
          className="flex w-6 h-6 my-2 mr-4"
          src="images/img_emoji.svg"
          alt="Emoji"
        ></img>
        <input type="text" className="flex-grow focus:outline-none text-gray-500" placeholder="Add a comment..."/>
        <button className="flex justify-center items-center text-blue-700 hover:font-semibold">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
