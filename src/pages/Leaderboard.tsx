import React from "react";
import { LeaderboardCard } from "../ui/Leaderboard";
import Background from "../assets/images/iconicBG.png";
import { useLocation } from "react-router-dom";
import { useTreasureByTreasureId } from "../react-query/hooks";
import { Loader } from "../ui/Loader";

export function Leaderboard() {
  const location = useLocation();
  const treasureId = location.state.treasureId;
  const treasureById = useTreasureByTreasureId(treasureId);

  if (treasureById.isFetching) {
    return <Loader />;
  }
  const currentTreasure = treasureById.treasureById;
  console.log("Treasure: ", currentTreasure);
  return (
    <div className="bg-bgColor h-screen flex flex-col">
      <div
        className="bg-repeat min-h-screen w-full flex flex-col"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="flex flex-row items-center mt-16 ml-12">
          <img
            src={require("../assets/images/LOGO.png")}
            alt="logo"
            width={186}
            height={140}
          />
          <p className="text-white text-5xl ml-12">
            Leaderboard of {currentTreasure.id}.{currentTreasure.name}
          </p>
        </div>

        <div className="">
          <LeaderboardCard
            rank={1}
            name={"Faruk Avcı"}
            finishTime={"Found in: 17 hours 59 minutes"}
          ></LeaderboardCard>
          <LeaderboardCard
            rank={2}
            name={"Alp Kartal"}
            finishTime={"Found in: 2 days 1 hour 59 minutes"}
          ></LeaderboardCard>
        </div>
      </div>
    </div>
  );
}
