import React from "react";
import { ReactComponent as MailboxIcon } from "../assets/icons/Mailbox.svg";
import { ReactComponent as EyeOnIcon } from "../assets/icons/EyeOn.svg";
import { ReactComponent as EyeOffIcon } from "../assets/icons/EyeOff.svg";

export type IconTypes = "mailbox" | "eyeOn" | "eyeOff";

type IconProps = {
  icon: IconTypes;
  width: string;
  height: string;
  onIconClick?: () => void;
};
export function Icons({ icon, width, height, onIconClick }: IconProps) {
  switch (icon) {
    case "mailbox":
      return (
        <button onClick={onIconClick}>
          <MailboxIcon width={width} height={height} />
        </button>
      );

    case "eyeOn":
      return (
        <button onClick={onIconClick}>
          <EyeOnIcon width={width} height={height} />
        </button>
      );

    case "eyeOff":
      return (
        <button onClick={onIconClick}>
          <EyeOffIcon width={width} height={height} />
        </button>
      );
    default:
      return (
        <button onClick={onIconClick}>
          <MailboxIcon width={width} height={height} />
        </button>
      );
  }
}
