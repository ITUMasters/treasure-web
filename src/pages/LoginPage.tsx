import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import Background from "../assets/images/iconicBG.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [checked, setChecked] = useState(false);
  return (
    <div className="bg-bgColor min-h-screen items-center flex flex-col">
      <div
        className="bg-repeat min-h-screen w-full"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="w-full mt-16 flex flex-col items-center">
          <img
            src={require("../assets/images/LOGO.png")}
            width={184}
            height={184}
            alt="treasure_logo"
          />
          <div>
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
            <div className="mt-4 flex flex-row items-center">
              <Checkbox
                checked={checked}
                onClick={() => {
                  setChecked(!checked);
                }}
              />
              <p className="text-white ml-2">Remember Me</p>
            </div>
            <div className="flex justify-center">
              <div className="mt-4 w-40">
                <Button size="xlarge">Login</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
