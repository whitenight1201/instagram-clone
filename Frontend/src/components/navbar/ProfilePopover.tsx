import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
// import { useUserData } from "../../hooks/useUserData";
import OutlineProfile from "../Icons/OutlineProfile";
import OutlineBookmark from "../Icons/OutlineBookmark";
import OutlineSetting from "../Icons/OutlineSetting";
import OutlineSwitch from "../Icons/OutlineSwitch";
import {logout} from "../../store/slices/auth";
import { useAppDispatch } from "../../store/hooks";

const ProfilePopover = () => {
  // const { username } = useUserData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error : any) => {
          // add show error message logic
          // console.log(error.message);
        }
      );
  };

  return (
    <Popover className="relative">
      <Popover.Button className="h-8 w-8 bg-gray-300 uppercase rounded-full">
        {/* {username.slice(0, 1)} */}
      </Popover.Button>
      <Transition
        leave="transition duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel
          className="absolute right-0 w-52 border bg-white shadow-xl rounded-lg"
          style={{ top: "calc(100% + 0.5rem)" }}
        >
          <div className="flex flex-col border-b-2 whitespace-none">
            <div
              className="cursor-pointer hover:bg-gray-100 flex items-center space-x-4 px-3 py-2"
              onClick={() => navigate("/profile")}
            >
              <OutlineProfile />
              <span style={{ fontSize: ".9rem" }}>Profile</span>
            </div>

            <div className="cursor-pointer hover:bg-gray-100 flex items-center space-x-4 px-3 py-2">
              <OutlineBookmark height={16} width={16} />
              <span style={{ fontSize: ".9rem" }}>Saved</span>
            </div>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center space-x-4 px-3 py-2">
              <OutlineSetting />
              <span style={{ fontSize: ".9rem" }}>Settings</span>
            </div>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center space-x-4 px-3 py-2">
              <OutlineSwitch />
              <span style={{ fontSize: ".9rem" }}>Switch Accounts</span>
            </div>
          </div>
          <div
            className="cursor-pointer hover:bg-gray-100 px-3 py-2"
            onClick={handleLogOut}
          >
            <span style={{ fontSize: ".9rem" }}>Logout</span>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfilePopover;
