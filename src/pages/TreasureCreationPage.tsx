import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import ImageUploading, { ImageListType } from "react-images-uploading";

export function TreasureCreationPage() {
  const [hardness, setHardness] = useState("easy");
  const [treasureName, setTreasureName] = useState("");
  const [regionName, setRegionName] = useState("");
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [hint3, setHint3] = useState("");
  const [images, setImages] = useState<any[]>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList as never[]);
  };

  return (
    <div className="bg-bgColor flex flex-row min-h-screen">
      <div className="flex flex-col flex-1">
        <div className="flex flex-row items-center mt-8 ml-12">
          <img
            src={require("../assets/images/LOGO.png")}
            alt="logo"
            width={139.5}
            height={105}
          />
          <p className="text-white text-4xl ml-8">Treasure Fabrication</p>
        </div>
        <div className="ml-8">
          <div className="w-80 mt-6">
            <Input
              title="Treasure Name"
              value={treasureName}
              onChange={(e) => {
                setTreasureName(e.target.value);
              }}
            />
          </div>
          <div className="w-80 mt-4">
            <Input
              title="Restricted Region Name"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
            />
          </div>
          <p className="text-white mt-2">Choose difficulty:</p>
          <div className="flex flex-row mt-1">
            <div>
              <Checkbox
                checked={hardness === "easy"}
                color="green"
                onClick={() => setHardness("easy")}
              />
            </div>
            <div className="ml-2">
              <Checkbox
                checked={hardness === "medium"}
                color="orange"
                onClick={() => setHardness("medium")}
              />
            </div>
            <div className="ml-2">
              <Checkbox
                checked={hardness === "hard"}
                color="red"
                onClick={() => setHardness("hard")}
              />
            </div>
          </div>
          <div className="w-60 mt-4">
            <Button size="xlarge">Submit Original Coordinate</Button>
          </div>
          <div className="w-80 mt-4">
            <Input
              title="Hint 1"
              value={hint1}
              onChange={(e) => setHint1(e.target.value)}
            />
          </div>
          <div className="w-80 mt-4">
            <Input
              title="Hint 2 (optional)"
              value={hint2}
              onChange={(e) => setHint2(e.target.value)}
            />
          </div>
          <div className="w-80 mt-4 mb-4">
            <Input
              title="Hint 3 (optional)"
              value={hint3}
              onChange={(e) => setHint3(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1 items-center">
        <ImageUploading value={images} onChange={onChange}>
          {({ onImageUpload, isDragging, dragProps }) => (
            <div {...dragProps}>
              <img
                src={
                  images.length > 0 && !isDragging
                    ? images[0].dataURL
                    : require("../assets/images/imageUpload.png")
                }
                alt="imageUploadPlace"
                width={1183 / 4}
                height={1860 / 4}
              />
              <div className="mt-8">
                <Button size="large" onClick={onImageUpload}>
                  Select or Drag Treasure Image
                </Button>
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}
