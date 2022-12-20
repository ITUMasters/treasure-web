import { ButtonBending, ButtonSize } from "../ui/Button";

type ButtonPropertiesType = {
  bending: ButtonBending;
  size: ButtonSize;
};

export const ButtonProperties = ({ bending, size }: ButtonPropertiesType) => {
  const radius = bending === "low" ? "rounded-lg" : "rounded-full";
  switch (size) {
    case "small":
      return {
        height: "h-8",
        radius,
      };

    case "medium":
      return {
        height: "h-9",
        radius,
      };

    case "large":
      return {
        height: "h-10",
        radius,
      };

    case "xlarge":
      return {
        height: "h-12",
        radius,
      };
  }
};

export default ButtonProperties;
