import React from "react";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import Background from "../assets/images/iconicBG.png";
import {
  useSetTreasure,
  useTreasure,
} from "../recoil-store/treasureStoreHooks";

export function TreasureCreationPage() {
  const navigate = useNavigate();
  const treasure = useTreasure();
  const setTreasure = useSetTreasure();

  const onChange = (imageList: ImageListType) => {
    setTreasure({ ...treasure, images: imageList as never[] });
  };

  return (
    <div className="bg-bgColor flex flex-row min-h-screen">
      <div
        className="bg-repeat min-h-screen w-full flex flex-row"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
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
                value={treasure.name}
                onChange={(e) => {
                  setTreasure({ ...treasure, name: e.target.value });
                }}
              />
            </div>
            <div className="w-80 mt-4">
              <Input
                title="Restricted Region Name"
                value={treasure.regionName}
                onChange={(e) =>
                  setTreasure({ ...treasure, regionName: e.target.value })
                }
              />
            </div>
            <p className="text-white mt-2 font-bold">Choose difficulty:</p>
            <div className="flex flex-row mt-1">
              <div>
                <Checkbox
                  checked={treasure.difficulty === "easy"}
                  color="green"
                  onClick={() =>
                    setTreasure({ ...treasure, difficulty: "easy" })
                  }
                />
              </div>
              <div className="ml-2">
                <Checkbox
                  checked={treasure.difficulty === "medium"}
                  color="orange"
                  onClick={() =>
                    setTreasure({ ...treasure, difficulty: "medium" })
                  }
                />
              </div>
              <div className="ml-2">
                <Checkbox
                  checked={treasure.difficulty === "hard"}
                  color="red"
                  onClick={() =>
                    setTreasure({ ...treasure, difficulty: "hard" })
                  }
                />
              </div>
            </div>
            {treasure.coordinate.lat !== 0 && (
              <p className="text-white w-full mt-2 font-bold">
                Treasure Name: {treasure.coordinate.name}
              </p>
            )}
            <div className="w-52 mt-4">
              <Button size="large" onClick={() => navigate(PATHS.MAP)}>
                Select Coordinate
              </Button>
            </div>
            <div className="w-80 mt-4">
              <Input
                title="Hint 1"
                value={treasure.hint1}
                onChange={(e) =>
                  setTreasure({ ...treasure, hint1: e.target.value })
                }
              />
            </div>
            <div className="w-80 mt-4">
              <Input
                title="Hint 2 (optional)"
                value={treasure.hint2}
                onChange={(e) =>
                  setTreasure({ ...treasure, hint2: e.target.value })
                }
              />
            </div>
            <div className="w-80 mt-4 mb-4">
              <Input
                title="Hint 3 (optional)"
                value={treasure.hint3}
                onChange={(e) =>
                  setTreasure({ ...treasure, hint3: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1 items-center">
          <ImageUploading value={treasure.images} onChange={onChange}>
            {({ onImageUpload, isDragging, dragProps }) => (
              <div {...dragProps}>
                <img
                  src={
                    treasure.images.length > 0 && !isDragging
                      ? treasure.images[0].dataURL
                      : require("../assets/images/Photo Placeholder.png")
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
                <div className="mt-8">
                  <Button size="large">Finish Production</Button>
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    </div>
  );
}
