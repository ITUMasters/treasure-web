import React from "react";
import { ReactComponent as MailboxIcon } from "../assets/icons/Mailbox.svg";
import { ReactComponent as EyeOnIcon } from "../assets/icons/EyeOn.svg";
import { ReactComponent as EyeOffIcon } from "../assets/icons/EyeOff.svg";

export type IconTypes = "mailbox" | "eyeOn" | "eyeOff";

type IconProps = {
  icon: IconTypes;
  width: string;
  height: string;
};
export function Icons({ icon, width, height }: IconProps) {
  console.log(width);
  switch (icon) {
    case "mailbox":
      return <MailboxIcon width={width} height={height} />;

    case "eyeOn":
      return <EyeOnIcon width={width} height={height} />;

    case "eyeOff":
      return <EyeOffIcon width={width} height={height} />;
    default:
      return <MailboxIcon width={width} height={height} />;
  }
}
