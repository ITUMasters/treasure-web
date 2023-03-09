import React from "react";
import { CreatedTreasureCard } from "../ui/CreatedTreasureCard";
import Background from "../assets/images/iconicBG.png";

export function Createds() {
  return (
    <div className="bg-bgColor h-screen flex flex-col">
      <div
        className="bg-repeat min-h-screen w-full"
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
          <p className="text-white text-5xl ml-12">Created Treasures</p>
        </div>

        <div className="">
          <CreatedTreasureCard
            id={1}
            name={"Bee Road"}
            difficulty={"Medium"}
            timeLeft={"Time Left: 4 days 2 hours 32 mins"}
          ></CreatedTreasureCard>
          <CreatedTreasureCard
            id={2}
            name={"Dogs"}
            difficulty={"Easy"}
            timeLeft={"Time Left: 14 mins"}
          ></CreatedTreasureCard>
        </div>
      </div>
    </div>
  );
}
