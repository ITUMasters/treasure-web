import React, { useState } from "react";
import { Input } from "../ui/Input";

export function MainPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  return (
    <div className="bg-bgColor h-screen items-center flex flex-col">
      <div className="w-full mt-24 flex flex-col items-center">
        <img
          src={require("../assets/images/LOGO.png")}
          width={192}
          height={192}
          alt="treasure_logo"
        />
        <div className="w-80 mt-12">
          <Input
            title="Email"
            icon="mailbox"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="w-80 mt-4">
          <Input
            title="Password"
            icon={isPasswordVisible ? "eyeOn" : "eyeOff"}
            value={password}
            type={!isPasswordVisible ? "password" : undefined}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onIconClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          />
        </div>
      </div>
    </div>
  );
}
