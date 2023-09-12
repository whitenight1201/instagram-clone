import React from "react";
import { followData } from "../../database";
import Follower from "../../components/limb/follower";

const RightSidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-full ml-5 py-6">
      {/* Profile */}
      <div className="flex items-center mr-3">
        <div className="2xl:w-14 2xl:h-14 xl:w-12 xl:h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6 mr-3">
          <img
            src="images/img_profilepics_13.png"
            className="rounded-full"
            alt="dp"
          />
        </div>
        <div className="flex-grow flex flex-col text-xs font-semibold md:text-sm">
          <p className="text-black">shirleyromero</p>
          <p className="text-gray-400">Shirley romero</p>
        </div>
        <div className="w-8 h-8">
          <button className="w-full h-full font-semibold hover:font-bold rounded-full text-blue-700 focus:outline-none">
            Switch
          </button>
        </div>
      </div>
      {/* Suggestions */}
      <div className="flex justify-between w-full pt-5 pb-3">
        <div className="flex-grow">
          <p className="font-normal text-sm text-gray-400">
            Suggestions For You
          </p>
        </div>
        <button className="text-sm font-semibold hover:font-bold rounded-full text-black focus:outline-none">
          <p>See All</p>
        </button>
      </div>
      {/* Follows */}
      <div className="flex flex-col gap-y-2">
        {followData.length ? (
          followData.map((follower, idx) => (
            <Follower key={idx} follower={follower} />
          ))
        ) : (
          <p>No posts yet!</p>
        )}
      </div>
      {/* Footer */}
      <div className="pt-3 text-xs text-gray-400">
          About Press API Jobs Privacy Terms Locations
          Top Accounts Hashtags Language
      </div>
    </div>
  );
};

export default RightSidebar;
