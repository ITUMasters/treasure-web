import React, { useMemo } from "react";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import Background from "../assets/images/iconicBG.png";
import {
  useSetTreasure,
  useTreasure,
} from "../recoil-store/treasureStoreHooks";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useHintByTreasureId,
  useHintUpdateMutation,
  useLocationUpdateMutation,
  useTreasureByTreasureId,
  useTreasureUpdateMutation,
} from "../react-query/hooks";
import Loading from "react-loading";
import { StateSetter } from "../ui/StateSetter";
import { hint } from "../recoil-store/treasureStore";
import { LocationGetter } from "../ui/LocationGetter";
import { formatError } from "../utils/formatError";
import { useNotify } from "../hooks/useNotify";
import { Hardness } from "../react-query/types";

export function TreasureEditPage() {
  const navigate = useNavigate();
  const treasure = useTreasure();
  const setTreasure = useSetTreasure();

  const onChange = (imageList: ImageListType) => {
    setTreasure({ ...treasure, images: imageList as never[] });
  };
  const location = useLocation();
  const { treasureById, isFetching } = useTreasureByTreasureId(
    location.state.treasureId
  );
  const comingFromMap = location.state && location.state.comingFromMap;

  const hintsByTresureId = useHintByTreasureId(location.state.treasureId);
  const notify = useNotify();

  const isButtonDisabled = useMemo(() => {
    const c1 = treasure.name.trim() === "";
    let c2 = false;
    for (let i = 0; i < treasure.hints.length; i++) {
      const thisHint = treasure.hints[i];
      if (
        thisHint.content.trim() === "" ||
        (i !== 0 && thisHint.cost.trim() === "") ||
        (!Number.isInteger(parseInt(thisHint.cost)) && i !== 0) ||
        thisHint.cost.indexOf(" ") >= 0
      ) {
        c2 = true;
        break;
      }
    }
    const c3 = treasure.coordinate.regionId === -1;
    return c1 || c2 || c3;
  }, [treasure]);

  const HintUpdateMutation = useHintUpdateMutation({
    onSuccess: (res) => {
      console.log("Hint update Sucess");
    },
    onError: (error) => {
      const err = formatError(error);
      if (err) {
        notify.error("Hint Update Fail\n" + err);
      }
    },
  });

  const updateHint = (hint: hint, isDefault: boolean) => {
    HintUpdateMutation.mutate({
      id: hint.hintId as number,
      content: hint.content,
      cost: isDefault ? 0 : parseInt(hint.cost),
      isDefault: isDefault,
    });
  };

  const TreasureUpdateMutation = useTreasureUpdateMutation({
    onSuccess: (res) => {
      for (let i = 0; i < treasure.hints.length; i++) {
        updateHint(treasure.hints[i], i === 0);
      }
    },
    onError: (error) => {
      const err = formatError(error);
      if (err) {
        notify.error("Treasure Update Fail\n" + err);
      }
    },
  });

  const updateTreasure = (treasureId: number) => {
    TreasureUpdateMutation.mutate({
      hardness: treasure.difficulty as Hardness,
      name: treasure.name,
      treasureId: treasureId,
      timeLimit: 60,
    });
  };

  const LocationUpdateMutation = useLocationUpdateMutation({
    onSuccess: (res) => {
      updateTreasure(location.state.treasureId);
    },
    onError: (error) => {
      const err = formatError(error);
      if (err) {
        notify.error("LocationInfo Update is failed\n" + err);
      }
    },
  });

  const updateLocation = () => {
    LocationUpdateMutation.mutate({
      locationId: treasureById.locationId,
      regionId: treasure.coordinate.regionId,
      altitude: 1,
      longitude: treasure.coordinate.lng,
      latitude: treasure.coordinate.lat,
    });
  };

  if (isFetching || hintsByTresureId.isFetching) {
    return <Loading />;
  }
  const hints = hintsByTresureId.hintsByTresureId;
  const newHints: hint[] = [];
  for (let i = 0; i < hints.length; i++) {
    newHints.push({
      hintId: hints[i].id,
      content: hints[i].content,
      cost: hints[i].cost.toString(),
    });
  }

  console.log("DEbuggegst", treasure.hints);

  return (
    <div className="bg-bgColor flex flex-row min-h-screen">
      {!comingFromMap && (
        <>
          <LocationGetter
            locationId={treasureById.locationId as number}
            regionName={treasureById.location?.region.name as string}
          />
          <StateSetter
            setSpecificState={() => {
              setTreasure({
                ...treasure,
                name: treasureById.name,
                difficulty: treasureById.hardness,
                hints: newHints,
                regionName: treasureById.location?.region.name as string,
                //coordinate: {name: treasureById.location?.region.name as string, lat: treasureById.location?.region.}
              });
            }}
          />
        </>
      )}
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
            <div className="w-52 mt-4 mb-2">
              <Button
                size="large"
                onClick={() =>
                  navigate(PATHS.MAP, {
                    state: {
                      isEdit: true,
                      treasureId: location.state.treasureId,
                    },
                  })
                }
              >
                Select Coordinate
              </Button>
            </div>
            <div className="max-h-60 overflow-y-scroll scrollbar-hide">
              {treasure.hints.map((hintName, index) => (
                <div className="flex flex-row items-center" key={index}>
                  <div className="w-80 mt-4">
                    <Input
                      title={"Hint: " + (index + 1).toString()}
                      value={hintName.content}
                      onChange={(e) =>
                        setTreasure({
                          ...treasure,
                          hints: [
                            ...treasure.hints.slice(0, index),
                            {
                              content: e.target.value,
                              cost: treasure.hints[index].cost,
                              hintId: treasure.hints[index].hintId,
                            },
                            ...treasure.hints.slice(index + 1),
                          ],
                        })
                      }
                    />
                  </div>
                  {index !== 0 && (
                    <div className="w-24 mt-4 ml-4">
                      <Input
                        title="Hint Cost"
                        value={hintName.cost.toString()}
                        onChange={(e) =>
                          setTreasure({
                            ...treasure,
                            hints: [
                              ...treasure.hints.slice(0, index),
                              {
                                content: treasure.hints[index].content,
                                cost: e.target.value,
                                hintId: treasure.hints[index].hintId,
                              },
                              ...treasure.hints.slice(index + 1),
                            ],
                          })
                        }
                      />
                    </div>
                  )}
                  <div
                    className="ml-4 text-3xl"
                    onClick={() => {
                      if (treasure.hints.length > 1) {
                        setTreasure({
                          ...treasure,
                          hints: [
                            ...treasure.hints.slice(0, index),
                            ...treasure.hints.slice(index + 1),
                          ],
                        });
                      }
                    }}
                  >
                    {treasure.hints.length >= 2 && (
                      <AiOutlineDelete fill="#E8311A" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-52 mt-4 mb-4">
              <Button
                size="large"
                onClick={() => {
                  setTreasure({
                    ...treasure,
                    hints: [
                      ...treasure.hints,
                      { content: "", cost: "", hintId: 0 },
                    ],
                  });
                }}
              >
                Add Hint
              </Button>
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
                  <Button
                    size="large"
                    disabled={isButtonDisabled}
                    HasFadeColor={isButtonDisabled}
                    onClick={updateLocation}
                  >
                    Finish Production
                  </Button>
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    </div>
  );
}
