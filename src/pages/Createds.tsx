import React from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import { CreatedTreasureCard } from "../ui/CreatedTreasureCard";

export function Createds() {
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
  );
}
