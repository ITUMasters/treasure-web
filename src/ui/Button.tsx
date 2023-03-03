import React, { ComponentPropsWithoutRef } from "react";
import ButtonProperties from "../utils/ButtonProperties";

export type ButtonSize = "small" | "medium" | "large" | "xlarge";
export type ButtonBending = "low" | "high";
export type ButtonColor = "default" | "faded";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  size: ButtonSize;
  bending?: ButtonBending;
  HasFadeColor?: boolean;
}

export function Button({
  children,
  disabled,
  size = "large",
  bending = "low",
  HasFadeColor = false,
  ...props
}: ButtonProps) {
  const buttonProps = ButtonProperties({
    bending,
    size,
  });

  const buttonStyle =
    `bg-lightPurple w-full ${buttonProps.height} ${buttonProps.radius}` +
    (HasFadeColor ? " opacity-50" : " opacity-100");
  return (
    <button disabled={disabled} className={buttonStyle} {...props}>
      <p className={`text-white text-l`}>{children}</p>
    </button>
  );
}
