import React, { useState } from "react";
import "./styles/App.css";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/Checkbox";

function App() {
  const [email, setEmail] = useState("faruk");
  const [checked, setChecked] = useState(false);
  return (
    <div className="bg-bgColor flex flex-col h-screen">
      <Button size="xlarge" bending="high">
        faruk
      </Button>
      <br />
      <br />
      <div className="flex justify-center">
        <div className="w-1/4">
          <Input
            title={"Eye"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={"mailbox"}
          />
          <br />
          <Input
            title={"Mail"}
            value={email}
            disabled={true}
            onChange={(e) => setEmail(e.target.value)}
            icon={"eyeOff"}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="self-center">
        <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
      </div>
    </div>
  );
}

export default App;
