import { clsnm } from "../../utils/clsnm";
import { ComponentPropsWithoutRef, CSSProperties } from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  size?: number;
  style?: CSSProperties;
}

const Spinner = ({
  className,
  size = 20,
  style = {},
  ...props
}: SpinnerProps) => {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px`, ...style }}
      className={clsnm(styles.loader, className)}
      {...props}
    ></div>
  );
};

export { Spinner };
