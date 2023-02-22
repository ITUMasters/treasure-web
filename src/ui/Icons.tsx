import React from "react";

type IconProps = {
  icon: string;
  width: string;
  height: string;
};
export function Icons({ icon, width, height }: IconProps) {
  const iconStyle = `w-${width} h-${height}`;
  return <img src={`images/${icon}`} className={iconStyle} alt=""></img>;
}
