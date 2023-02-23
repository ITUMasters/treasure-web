import React, { ComponentPropsWithoutRef } from "react";
import { IconTypes, Icons } from "./Icons";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  icon?: IconTypes;
  iconWidth?: string;
  iconHeight?: string;
  onIconClick?: () => void;
  title: string;
}
export function Input({
  icon,
  iconWidth,
  iconHeight,
  onIconClick,
  title,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-row relative">
      <input
        className="bg-gray w-full h-16 rounded-lg pl-2 pt-2 focus:outline-none"
        {...props}
      />
      <p className="absolute mt-1 pl-2 text-sm text-lightBlack">{title}</p>
      {icon && (
        <div className="absolute right-2 mt-8 -translate-y-2/4">
          <Icons
            icon={icon}
            height={iconHeight !== undefined ? iconHeight : "24"}
            width={iconWidth !== undefined ? iconWidth : "24"}
            onIconClick={onIconClick}
          />
        </div>
      )}
    </div>
  );
}
