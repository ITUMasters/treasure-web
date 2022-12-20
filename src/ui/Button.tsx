import React, { ComponentPropsWithoutRef } from "react";
import ButtonProperties from "../utils/ButtonProperties";

export type ButtonSize = "small" | "medium" | "large" | "xlarge";
export type ButtonBending = "low" | "high";
export type ButtonColor = "default" | "faded";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  size: ButtonSize;
  bending?: ButtonBending;
}

export function Button({
  children,
  disabled,
  size = "large",
  bending = "low",
}: ButtonProps) {
  const buttonProps = ButtonProperties({
    bending,
    size,
  });

  return (
    <button
      disabled={disabled}
      className={`bg-lightPurple w-full ${buttonProps.height} ${buttonProps.radius}`}
    >
      <p className={`text-white text-xl`}>{children}</p>
    </button>
  );
}
