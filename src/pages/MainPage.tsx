import React from "react";
import { Button } from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import Background from "../assets/images/iconicBG.png";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { useId, useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useUser } from "../react-query/hooks";
import { Loader } from "../ui/Loader";
import { useSetTreasure } from "../recoil-store/treasureStoreHooks";

export function MainPage() {
  const navigate = useNavigate();
  const setAuth = useSetAuth();
  const setId = useSetId();
  const userId = useId();
  const setTreasure = useSetTreasure();
  const location = useLocation();

  const logout = () => {
    setId(0);
    setAuth(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("remember_me");
  };
  if (
    location !== null &&
    location.state !== null &&
    location.state.clearTreasure !== null &&
    location.state.clearTreasure
  ) {
    setTreasure({
      name: "",
      regionName: "",
      difficulty: "easy",
      coordinate: {
        name: "My Treasure",
        lat: 0,
        lng: 0,
        regionId: -1,
      },
      hints: [{ content: "", cost: "", hintId: 0 }],
      deletedHints: [],
      images: [],
    });
  }

  const { user, isFetching } = useUser(userId);
  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="bg-bgColor h-screen flex flex-col">
      <div
        className="min-h-screen w-full flex flex-col"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="flex flex-row items-center mt-16 ml-12 w-full">
          <img
            src={require("../assets/images/LOGO.png")}
            alt="logo"
            width={186}
            height={140}
          />
          <p className="text-white text-5xl ml-12">
            Welcome {user.name + " " + user.surname}
          </p>
          <div className="flex flex-row grow mr-20 justify-end">
            <div className="w-20">
              <Button size="small" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
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
        <div className="w-52 mt-8 ml-12">
          <Button size="xlarge" onClick={() => navigate(PATHS.REGIONCREATION)}>
            Create Region
          </Button>
        </div>
      </div>
    </div>
  );
}
