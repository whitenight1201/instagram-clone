import React, { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import TelegramIcon from "@material-ui/icons/Telegram";
import { useAppDispatch } from "../../store/hooks";
import { addPost, showHidePostModal } from "../../store/slices/post";

const AddPostModal: React.FC = () => {
  const [src, setSrc] = useState("");
  const [caption, setCaption] = useState<string>("");
  const [type, setType] = useState<string>("");
  const dispatch = useAppDispatch();

  const readURL = (input: any) => {
    const [file] = input.files;

    if (file) {
      // let src = URL.createObjectURL(file);
      setSrc(file);
    }
  };

  const share = () => {
    const formData = new FormData();
    formData.append("content", caption);
    formData.append("type", type);
    formData.append("file", src);

    dispatch(addPost(formData));
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-black bg-opacity-30">
      <div
        onClick={() => dispatch(showHidePostModal())}
        className="absolute top-10 right-10 text-white cursor-pointer"
      >
        <CancelIcon style={{fontSize: '40px'}}/>
      </div>
      <form className="flex flex-col items-center justify-evenly h-1/3 bg-white shadow-sm px-5">
        <header>
          <p className="mb-3 text-2xl font-semibold">New Post</p>
        </header>
        <input
          type="file"
          name="file"
          className="w-full outline-none border-b-2 cursor-pointer"
          onChange={(e: any) => readURL(e.target)}
        />
        <input
          type="text"
          name="content"
          className="w-full outline-none border-b-2"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e: any) => setCaption(e.target.value)}
        />
        <input
          type="text"
          name="file"
          className="w-full outline-none border-b-2"
          placeholder="File Type.."
          value={type}
          onChange={(e: any) => setType(e.target.value)}
        />
        <div
          className="flex justify-center items-center text-2xl font-semibold text-white hover:bg-blue-500 hover:scale-105 bg-blue-400 rounded-md w-[80%] cursor-pointer"
          onClick={share}
        >
          Share <TelegramIcon />
        </div>
      </form>
    </div>
  );
};

export default AddPostModal;
