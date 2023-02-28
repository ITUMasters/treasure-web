import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
type CheckboxColorType = "white" | "green" | "orange" | "red";
type CheckboxProps = {
  checked: boolean;
  onClick?: () => void;
  color?: CheckboxColorType;
};
export function Checkbox({ checked, onClick, color = "white" }: CheckboxProps) {
  const colorCodes: any = new Map([
    ["white", "#FFFFFF"],
    ["green", "#30B526"],
    ["orange", "#FF950F"],
    ["red", "#E8311A"],
  ]);
  return (
    <button onClick={onClick}>
      {checked && (
        <ImCheckboxChecked color={colorCodes.get(color)} className="text-lg" />
      )}
      {!checked && (
        <ImCheckboxUnchecked
          color={colorCodes.get(color)}
          className={"text-lg"}
        />
      )}
    </button>
  );
}
