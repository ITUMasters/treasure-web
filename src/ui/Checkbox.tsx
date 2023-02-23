import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
type CheckboxProps = {
  checked: boolean;
  onClick?: () => void;
};
export function Checkbox({ checked, onClick }: CheckboxProps) {
  return (
    <button onClick={onClick}>
      {checked && <ImCheckboxChecked className="fill-white text-lg" />}
      {!checked && <ImCheckboxUnchecked className="fill-white text-lg" />}
    </button>
  );
}
