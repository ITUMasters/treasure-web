import React from "react";
import { CreatedTreasureCard } from "../ui/CreatedTreasureCard";
import Background from "../assets/images/iconicBG.png";
import { useTreasureByOwnerId } from "../react-query/hooks";
import { useId } from "../recoil-store/auth/IdStoreHooks";
import { Loader } from "../ui/Loader";

export function Createds() {
  const ownerId = useId();
  const { treasuresByOwnerId, isFetching } = useTreasureByOwnerId(ownerId);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="bg-bgColor min-h-screen flex flex-col min-w-fit">
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

        {treasuresByOwnerId.map((e, index) => (
          <CreatedTreasureCard
            key={index}
            id={e.id as number}
            name={e.name}
            difficulty={e.hardness}
            timeLeft={""}
            treasureId={e.id as number}
          ></CreatedTreasureCard>
        ))}
      </div>
    </div>
  );
}
