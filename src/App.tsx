import React, { useState } from "react";
import "./styles/App.css";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

function App() {
  const [email, setEmail] = useState("faruk");
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
