import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`disabled:bg-opacity-70 bg-blue-500 hover:bg-blue-600 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
