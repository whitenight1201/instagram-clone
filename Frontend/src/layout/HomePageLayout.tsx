import React from "react";
import MainContentContainer from "../common/MainContentContainer";
import Navbar from "../components/Navbar";
import AddPostModal from "../components/AddPostModal/AddPostModal";
import { useAppSelector } from "../store/hooks";

interface IProps {
  children?: React.ReactNode;
}

function HomePageLayout(props: IProps) {
  const { showhidepostpanel: showpostpanel } = useAppSelector(
    (state) => state.posts
  );

  const { children } = props;
  return (
    <div className="flex flex-col w-full h-full xl:px-[25%] lg:px-[20%] md:px-[15%] px-[7%] pt-[53px]">
      <Navbar />
      {showpostpanel ? (
        <div className="w-full h-full fixed left-0">
          <AddPostModal />
        </div>
      ) : (
        <div></div>
      )}
      <MainContentContainer>{children}</MainContentContainer>
    </div>
  );
}

export default HomePageLayout;
