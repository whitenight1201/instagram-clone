import React from "react";
import NewsFeedScreen from './NewsFeed';
import RightSidebar from './RightSidebar';

function HomePage() {
  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="sm:col-span-8 col-span-12 flex h-full">
        <NewsFeedScreen />
      </div>
      <div className="col-span-4 sm:flex sm:visible hidden">
        <RightSidebar />
      </div>
    </div>
  );
}

export default HomePage;
