import React, { ComponentPropsWithoutRef } from "react";
import { Icons } from "./Icons";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  icon?: string;
  title: string;
}
export function Input({ icon, title, ...props }: InputProps) {
  return (
    <div className="flex flex-row relative">
      <input className="bg-gray w-full h-16 rounded-lg pl-2 pt-2" {...props} />
      <p className="absolute mt-1 pl-2 text-sm text-lightBlack">{title}</p>
      {icon && (
        <div className="absolute right-2 mt-8 -translate-y-2/4">
          <Icons icon={icon} width="4" height="4" />
        </div>
      )}
    </div>
  );
}
