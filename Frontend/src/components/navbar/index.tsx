import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { showHidePostModal } from "../../store/slices/post";

import FillAdd from "../Icons/FillAdd";
import OutlineAdd from "../Icons/OutlineAdd";
import FillHome from "../Icons/FillHome";
import OutlineHome from "../Icons/OutlineHome";
import OutlineMessenger from "../Icons/OutlineMessenger";
import FillMessenger from "../Icons/FillMessenger";
import FillFindPeople from "../Icons/FillFindPeople";
import OutlineFindPeople from "../Icons/OutlineFindPeople";
import FillActivityFeed from "../Icons/FillActivityFeed";
import OutlineActivityFeed from "../Icons/OutlineActivityFeed";

import Search from "./Search";
import ProfilePopover from "./ProfilePopover";

export default function Navbar() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { showhidepostpanel } = useAppSelector((state) => state.posts);

  const inputSearch = (e: any) => {
    let value: any = e.target.value;
    setSearchVal(value);
  };

  const handlePostShow = () => {
    dispatch(showHidePostModal());
  };

  return (
    <div className="grid grid-cols-12 fixed z-50 top-0 left-0 xl:px-[25%] lg:px-[20%] md:px-[15%] px-[7%] w-full h-[53px] bg-white border-b-2 border-b-[#DBDBDB] pt-3">
      <div className="flex justify-start col-span-4">
        <img
          className="h-[29px] cursor-pointer"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="col-span-4 md:flex h-full items-center md:visible hidden px-6 pb-2">
        <Search searchVal={searchVal} inputSearch={inputSearch} />
      </div>
      <div className="flex col-span-4 justify-end h-full pb-2">
        <div className="w-auto flex items-center gap-4">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            {location.pathname === "/" ? <FillHome /> : <OutlineHome />}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/messenger")}
          >
            {location.pathname === "/messenger" ? (
              <FillMessenger />
            ) : (
              <OutlineMessenger />
            )}
          </div>
          <div className="cursor-pointer" onClick={handlePostShow}>
            {showhidepostpanel ? <FillAdd /> : <OutlineAdd />}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/findpeople")}
          >
            {location.pathname === "/findpeople" ? (
              <FillFindPeople />
            ) : (
              <OutlineFindPeople />
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/activityfeed")}
          >
            {location.pathname === "/activityfeed" ? (
              <FillActivityFeed />
            ) : (
              <OutlineActivityFeed />
            )}
          </div>
          <ProfilePopover />
        </div>
      </div>
    </div>
  );
}
