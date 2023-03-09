import React from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import { CreatedTreasureCard } from "../ui/CreatedTreasureCard";
import { LeaderboardCard } from "../ui/Leaderboard";

export function Leaderboard() {
  const navigate = useNavigate();
  return (
    <div className="bg-bgColor h-screen flex flex-col">
      <div className="flex flex-row items-center mt-16 ml-12">
        <img
          src={require("../assets/images/LOGO.png")}
          alt="logo"
          width={186}
          height={140}
        />
        <p className="text-white text-5xl ml-12">Leaderboard of 1.Dogs</p>
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
  );
}
