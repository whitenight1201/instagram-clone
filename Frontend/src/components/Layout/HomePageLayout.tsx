import React from 'react';
import MainContentContainer from '../../common/MainContentContainer';
import Navbar from '../limb/navbar';

interface IProps {
  children?: React.ReactNode;
}

function HomePageLayout(props: IProps) {
  const { children } = props;
  return (
    <div className="flex flex-col w-full h-full xl:px-[25%] lg:px-[20%] md:px-[15%] px-[7%] pt-[53px]">
      <Navbar />
      <MainContentContainer>{children}</MainContentContainer>
    </div>
  );
}

export default HomePageLayout;
