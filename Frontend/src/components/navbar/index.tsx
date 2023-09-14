import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import FillHome from "../Icons/FillHome";
import OutlineHome from "../Icons/OutlineHome";

import Search from "./Search";
import ProfilePopover from "./ProfilePopover";
import OutlineAdd from "../Icons/OutlineAdd";

export default function Navbar() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const inputSearch = (e: any) => {
    let value: any = e.target.value;
    setSearchVal(value);
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
        <div className="w-auto flex items-center gap-5">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            {location.pathname === "/" ? <FillHome /> : <OutlineHome />}
          </div>

          <Link to="/messenger">
            <img
              className="h-[22px]"
              src="images/img_messenger.svg"
              alt="Messenger"
            />
          </Link>
          <div className="cursor-pointer">
            <OutlineAdd />
          </div>
          <Link to="/findpeople">
            <img
              className="h-[22px]"
              src="images/img_findpeople.svg"
              alt="Find People"
            />
          </Link>
          <Link to="/activityfeed">
            <img
              className="h-[22px]"
              src="images/img_activityfeed.svg"
              alt="Activity Feed"
            />
          </Link>
          {/* <Link to="/profile">
            <img
              className="h-[22px]"
              src="images/img_avatarcircle.png"
              alt="Avatar"
            />
          </Link> */}
          <ProfilePopover />
        </div>
      </div>
    </div>
  );
}
