import React from "react";

interface IProps {
  children?: React.ReactNode;
}

function MainContentContainer(props: IProps) {
  const { children } = props;
  return <div className="mt-5">{children}</div>;
}

export default MainContentContainer;
