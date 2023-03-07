import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
  ImConfused,
} from "react-icons/im";
import { Button } from "./Button";
import { Icons } from "./Icons";
type LeaderboardCardProps = {
  rank: number;
  name: string;
  finishTime: string;
};
export function LeaderboardCard({
  rank,
  name,
  finishTime,
}: LeaderboardCardProps) {
  return (
    <div
      className="flex flex-row"
      style={{
        backgroundColor: "#D9D9D9",
        marginLeft: 52,
        marginRight: 1000,
        marginTop: 12,
        height: 48,
        borderRadius: 10,
      }}
    >
      <div style={{ marginLeft: 12, marginTop: 12, fontWeight: "bold" }}>
        <p className="text-black text-5s">{rank}.</p>
      </div>
      <div
        style={{
          width: 32,
          marginLeft: 16,
        }}
      >
        <div style={{ marginTop: 8 }}>
          <img
            src={require("../assets/images/alpImage.png")}
            alt="logo"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div style={{ marginLeft: 12, marginTop: 12, fontWeight: "bold" }}>
        <p className="text-black text-5s">{name}</p>
      </div>
      <div style={{ marginLeft: 12, marginTop: 12 }}>
        <p className="text-black text-5s">{finishTime}</p>
      </div>
    </div>
  );
}
