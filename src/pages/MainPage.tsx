import React from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import Background from "../assets/images/iconicBG.png";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { useId, useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useUser } from "../react-query/hooks";
import ReactLoading from "react-loading";

export function MainPage() {
  const navigate = useNavigate();
  const setAuth = useSetAuth();
  const setId = useSetId();
  const userId = useId();

  const logout = () => {
    setId(0);
    setAuth(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("remember_me");
  };

  const { user, isFetching } = useUser(userId);
  if (isFetching) {
    return (
      <div className="flex justify-center mt-40 ">
        <ReactLoading
          type="spinningBubbles"
          color={"#5B3DF6"}
          height={"15%"}
          width={"15%"}
        />
      </div>
    );
  }
  console.log(user);

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
      </div>
    </div>
  );
}
