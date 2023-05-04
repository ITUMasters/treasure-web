import { Button } from "./Button";
import { Icons } from "./Icons";
import { PATHS } from "../consts/paths";
import { useNavigate } from "react-router-dom";
type CreatedTreasureCardProps = {
  id: number;
  name: string;
  difficulty: string;
  timeLeft: string;
  treasureId: number;
};
export function CreatedTreasureCard({
  id,
  name,
  difficulty,
  timeLeft,
  treasureId,
}: CreatedTreasureCardProps) {
  var difficultyColor = "#30B526";
  if (difficulty === "medium") {
    difficultyColor = "#FF950F";
  } else if (difficulty === "hard") {
    difficultyColor = "#E8311A";
  }
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#D9D9D9",
        marginLeft: 52,
        width: 580,
        marginTop: 12,
        height: 48,
        borderRadius: 10,
      }}
    >
      <div className="flex flex-row flex-1">
        <div style={{ width: 200, marginTop: 12, marginLeft: 16 }}>
          <p style={{ fontWeight: "bold" }} className="text-black text-5l ">
            {id}. {name}
          </p>
        </div>

        <div
          style={{
            width: 64,
            marginTop: 12,
            marginLeft: 32,
          }}
        >
          <p
            style={{
              color: difficultyColor,
              fontWeight: "bold",
            }}
            className="text-black text-5l"
          >
            {difficulty[0].toUpperCase() +
              difficulty.substring(1, difficulty.length)}
          </p>
        </div>

        <div style={{ width: 96, marginTop: 8, marginLeft: 64 }}>
          <div className="w-24">
            <Button
              size="small"
              onClick={() =>
                navigate(PATHS.EDITTREASURE, {
                  state: { treasureId: treasureId },
                })
              }
            >
              Edit
            </Button>
          </div>
        </div>

        <div
          className="w-24 flex justify-end mt-2"
          onClick={() => {
            navigate(PATHS.LEADERBOARD, { state: { treasureId: treasureId } });
          }}
        >
          <Icons icon="leaderboard" width="32" height="32"></Icons>
        </div>
      </div>
    </div>
  );
}
