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
  ...props
}: ButtonProps) {
  const buttonProps = ButtonProperties({
    bending,
    size,
  });

  return (
    <button
      disabled={disabled}
      className={`bg-lightPurple w-full ${buttonProps.height} ${buttonProps.radius}`}
      {...props}
    >
      <p className={`text-white text-l`}>{children}</p>
    </button>
  );
}
