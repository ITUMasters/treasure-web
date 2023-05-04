import React from "react";
import { LeaderboardCard } from "../ui/LeaderboardCard";
import Background from "../assets/images/iconicBG.png";
import { useLocation } from "react-router-dom";
import { useLeaderboard, useTreasureByTreasureId } from "../react-query/hooks";
import { Loader } from "../ui/Loader";

const adjustTime = (time: number) => {
  const day = Math.floor(time / (24 * 60 * 60));
  time -= day * (24 * 60 * 60);
  const hour = Math.floor(time / (60 * 60));
  time -= hour * 60 * 60;
  const minute = Math.floor(time / 60);
  time -= minute * 60;
  const second = Math.floor(time);
  return (
    "Found in: " +
    (day > 0 ? day.toString() + " days " : "") +
    (hour > 0 ? hour.toString() + " hour " : "") +
    (minute > 0 ? minute.toString() + " minutes " : "") +
    (second > 0 ? second.toString() + " second" : "")
  );
};
export function Leaderboard() {
  const location = useLocation();
  const treasureId = location.state.treasureId;
  const treasureById = useTreasureByTreasureId(treasureId);
  const leaderboardByTreasureId = useLeaderboard(treasureId);
  if (treasureById.isFetching || leaderboardByTreasureId.isFetching) {
    return <Loader />;
  }
  const currentTreasure = treasureById.treasureById;
  const leaderboard = leaderboardByTreasureId.leaderboard.leaderboard;
  return (
    <div className="bg-bgColor h-screen flex flex-col min-w-fit">
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

        <div className="ml-8 mt-4">
          {leaderboard.map((element: any, index: number) => (
            <LeaderboardCard
              key={index}
              rank={element.rank}
              name={element.user.name + " " + element.user.surname}
              finishTime={adjustTime(element.time)}
            ></LeaderboardCard>
          ))}
        </div>
      </div>
    </div>
  );
}
