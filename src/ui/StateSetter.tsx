import { useEffect } from "react";

export type StateSetterProps = {
  setSpecificState: () => void;
};
export const StateSetter = ({ setSpecificState }: StateSetterProps) => {
  useEffect(() => {
    setSpecificState();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <></>;
};
