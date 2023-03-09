import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
  ImConfused,
} from "react-icons/im";
import { Button } from "./Button";
import { Icons } from "./Icons";
type CreatedTreasureCardProps = {
  id: number;
  name: string;
  difficulty: string;
  timeLeft: string;
};
export function CreatedTreasureCard({
  id,
  name,
  difficulty,
  timeLeft,
}: CreatedTreasureCardProps) {
  var difficultyColor = "#30B526";
  if (difficulty == "Medium") {
    difficultyColor = "#FF950F";
  } else if (difficulty == "Hard") {
    difficultyColor = "#E8311A";
  }
  return (
    <div
      style={{
        backgroundColor: "#D9D9D9",
        marginLeft: 52,
        marginRight: 400,
        marginTop: 12,
        height: 48,
        borderRadius: 10,
      }}
    >
      <div className="flex flex-row">
        <div style={{ width: 160, marginTop: 12, marginLeft: 16 }}>
          <p style={{ fontWeight: "bold" }} className="text-black text-5l ">
            {id}. {name}
          </p>
        </div>

        <div
          style={{
            width: 64,
            marginTop: 12,
            marginLeft: 64,
          }}
        >
          <p
            style={{
              color: difficultyColor,
              fontWeight: "bold",
            }}
            className="text-black text-5l"
          >
            {difficulty}
          </p>
        </div>

        <div style={{ width: 260, marginTop: 12, marginLeft: 64 }}>
          <p className="text-black text-bold text-5l">{timeLeft}</p>
        </div>

        <div style={{ width: 96, marginTop: 8, marginLeft: 64 }}>
          <div className="w-24">
            <Button size="small">Edit</Button>
          </div>
        </div>

        <div style={{ width: 96, marginTop: 8, marginLeft: 64 }}>
          <div className="w-24">
            <Button size="small">Start</Button>
          </div>
        </div>

        <div style={{ width: 32, marginTop: 8, marginLeft: 64 }}>
          <div className="w-24">
            <Icons icon="leaderboard" width="32" height="32"></Icons>
          </div>
        </div>
      </div>
    </div>
  );
}
