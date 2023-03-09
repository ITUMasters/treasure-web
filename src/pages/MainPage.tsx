import React from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import Background from "../assets/images/iconicBG.png";

export function MainPage() {
  const navigate = useNavigate();
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
          <p className="text-white text-5xl ml-12">Welcome Alp Kartal</p>
        </div>
        <div className="w-52 mt-20 ml-12">
          <Button
            size="xlarge"
            onClick={() => navigate(PATHS.TREASUREFABRICATION)}
          >
            Create Treasure
          </Button>
        </div>
        <div className="w-52 mt-8 ml-12">
          <Button size="xlarge" onClick={() => navigate(PATHS.CREATEDS)}>
            Created Treasures
          </Button>
        </div>
      </div>
    </div>
  );
}
