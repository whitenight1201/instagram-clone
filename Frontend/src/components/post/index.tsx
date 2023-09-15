import React, { useState } from "react";
import ReactPlayer from "react-player";

import OutlineFavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import FillFavoriteIcon from "@material-ui/icons/FavoriteRounded";
import MovieIcon from "@material-ui/icons/MovieOutlined";

import Comment from "../Comment";
import moment from "moment";
import {
  addComment,
  addLikeToPost,
  fetchComments,
} from "../../store/slices/post";
import { useAppDispatch } from "../../store/hooks";

import { ICommentaryParms, ILikePostParms, IPostData } from "../../types/post";

interface IProps {
  postData: IPostData;
}

const Post: React.FC<IProps> = (props) => {
  const { postData } = props;
  const { author } = postData.post;

  const [commentValue, setCommentValue] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(postData.post.liketype);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const defaultcommentshownumber: number = 3;

  const handleClickShowAll = () => {
    if (!showAllComments) {
      dispatch(fetchComments(postData.post._id));
    }
    setShowAllComments(!showAllComments);
  };

  const handleAddComment = () => {
    const commentaryparms: ICommentaryParms = {
      post_id: postData.post._id,
      commentary: commentValue,
    };
    if (commentValue !== "") {
      dispatch(addComment(commentaryparms));
    }
    setCommentValue("");
  };

  const handleLikeToPost = () => {
    const likepostparam: ILikePostParms = {
      post_id: postData.post._id,
      like: !isLiked,
    };
    setIsLiked(!isLiked);
    dispatch(addLikeToPost(likepostparam));
  };

  return (
    <div className="w-full shadow bg-white">
      {/* Avatar */}
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

      <div className="w-full max-h-100 relative">
        {postData.post.filename ? (
          <div>
            {postData.post.type === "IMAGE" ? (
              <img
                src={process.env.REACT_APP_BASE_URL + postData.post.filename}
                alt="postimage"
                className="w-full h-76 max-h-100 object-cover"
              />
            ) : (
              <div
                onMouseEnter={() => setShowVideo(true)}
                onMouseLeave={() => setShowVideo(false)}
              >
                <ReactPlayer
                  url={process.env.REACT_APP_BASE_URL + postData.post.filename}
                  controls={showVideo}
                  width={"100%"}
                  height={"100%"}
                  playing={showVideo}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="border-b-[1px] border-gray-100"></div>
        )}

        {postData.post.type === "VIDEO" && (
          <div
            className={`movieicon absolute top-2 right-2 text-white transition-all duration-500 ${
              showVideo ? "opacity-0" : "opacity-90"
            } `}
          >
            <MovieIcon />
          </div>
        )}
      </div>

      <div className="w-full flex flex-col px-4">
        {/* Icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="focus:outline-none flex items-center justify-center w-10 h-10 rounded-full bg-white"
              onClick={handleLikeToPost}
            >
              {isLiked ? (
                <FillFavoriteIcon style={{ color: "red" }} />
              ) : (
                <OutlineFavoriteIcon />
              )}
            </div>
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
            {postData.comments.length > 0 ? (
              postData.comments
                .slice(
                  0,
                  showAllComments
                    ? postData.post.commentcnt
                    : defaultcommentshownumber
                )
                .map((comment, idx) => <Comment key={idx} comment={comment} />)
            ) : (
              <p className="text-sm text-gray-400">No comments yet!</p>
            )}
          </div>
          {postData.post.commentcnt > defaultcommentshownumber ? (
            <div className="flex justify-between">
              <button
                className="flex text-sm hover:bg-gray-100 rounded-md text-gray-500 focus:outline-none"
                onClick={handleClickShowAll}
              >
                {showAllComments
                  ? `Hide all `
                  : `Show all ` + postData.post.commentcnt + " comments"}
              </button>
            </div>
          ) : (
            <></>
          )}
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
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <div
          className="flex justify-center items-center text-blue-700 hover:font-semibold cursor-pointer"
          onClick={handleAddComment}
        >
          Post
        </div>
      </div>
    </div>
  );
};

export default Post;
