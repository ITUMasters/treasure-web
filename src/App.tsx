import React, { useState } from "react";
import "./styles/App.css";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { imageLinks } from "./icons";

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
            icon={imageLinks.eye}
          />
          <br />
          <Input
            title={"Mail"}
            value={email}
            disabled={true}
            onChange={(e) => setEmail(e.target.value)}
            icon={imageLinks.mailbox}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
