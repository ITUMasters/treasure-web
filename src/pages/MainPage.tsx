import React from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import Background from "../assets/images/iconicBG.png";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";

export function MainPage() {
  const navigate = useNavigate();
  const setAuth = useSetAuth();
  const setId = useSetId();

  const logout = () => {
    setId(0);
    setAuth(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("remember_me");
  };

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
          <p className="text-white text-5xl ml-12">Welcome Alp Kartal</p>
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
      </div>
    </div>
  );
}
