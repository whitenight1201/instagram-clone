import React, { useState } from "react";
import { Link } from "react-router-dom";

import Search from "../search";

export default function Navbar() {
  const [searchVal, setSearchVal] = useState("");
  const inputSearch = (e: any) => {
    let value: any = e.target.value;
    setSearchVal(value);
  };
  return (
    <div className="grid grid-cols-12 fixed z-50 top-0 left-0 xl:px-[25%] lg:px-[20%] md:px-[15%] px-[7%] w-full h-[53px] bg-white border-b-2 border-b-[#DBDBDB] pt-3">
      <div className="flex justify-start col-span-4">
        <img className="h-[29px]" src="images/img_logo.png" alt="Instagram" />
      </div>
      <div className="col-span-4 md:flex h-full items-center md:visible hidden px-6 pb-2">
        <Search searchVal={searchVal} inputSearch={inputSearch} />
      </div>
      <div className="flex col-span-4 justify-end gap-5">
        <Link to="/">
          <img className="h-[22px]" src="images/img_home.svg" alt="Instagram" />
        </Link>
        <Link to="/messenger">
          <img
            className="h-[22px]"
            src="images/img_messenger.svg"
            alt="Messenger"
          />
        </Link>
        <Link to="/newpost">
          <img
            className="h-[22px]"
            src="images/img_newpost.svg"
            alt="New Post"
          />
        </Link>
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
        <Link to="/profile">
          <img
            className="h-[22px]"
            src="images/img_avatarcircle.png"
            alt="Avatar"
          />
        </Link>
      </div>
    </div>
  );
}
