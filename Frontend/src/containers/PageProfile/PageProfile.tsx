import React from "react";
import { Link } from "react-router-dom";

const PageProfile: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-4xl">
        <span className="font-bold"> Profile Page</span>
      </p>
      <Link to="/">
        <p className="mt-2 text-sm underline text-blue-600"></p>
        Go Home
      </Link>
    </div>
  );
};

export default PageProfile;
