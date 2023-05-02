import React, { useMemo } from "react";
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
import { AiOutlineDelete } from "react-icons/ai";
import {
  useHintCreationMutation,
  useLocationInfoSubmitMutation,
  useTreasureSubmissionMutation,
} from "../react-query/hooks";
import { formatError } from "../utils/formatError";
import { useNotify } from "../hooks/useNotify";
import { useId, useSetId } from "../recoil-store/auth/IdStoreHooks";
import { Hardness } from "../react-query/types";
import { hint } from "../recoil-store/treasureStore";
import { Loader } from "../ui/Loader";
import { AxiosError } from "axios";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";

export function TreasureCreationPage() {
  const navigate = useNavigate();
  const treasure = useTreasure();
  const setTreasure = useSetTreasure();
  const notify = useNotify();
  const userId = useId();
  const setId = useSetId();
  const setAuth = useSetAuth();

  const onChange = (imageList: ImageListType) => {
    setTreasure({ ...treasure, images: imageList as never[] });
  };

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

  const HintCreationMutation = useHintCreationMutation({
    onSuccess: (res) => {},
    onError: (error: any) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired") {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
      if (err) {
        notify.error("Hint Creation Fail\n" + err);
      }
    },
  });

  const createHint = (treasureId: number, hint: hint, isDefault: boolean) => {
    HintCreationMutation.mutate({
      treasureId: treasureId,
      content: hint.content,
      cost: isDefault ? 0 : parseInt(hint.cost),
      isDefault: isDefault,
    });
  };
  const TreasureSubmissionMutation = useTreasureSubmissionMutation({
    onSuccess: (res) => {
      const createdTreasureId = res.data.id;
      for (let i = 0; i < treasure.hints.length; i++) {
        createHint(createdTreasureId, treasure.hints[i], i === 0);
      }
    },
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired") {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
      if (err) {
        notify.error("Treasure Creation Fail\n" + err);
      }
    },
  });

  const submitTreasure = (locationId: number) => {
    TreasureSubmissionMutation.mutate({
      locationId: locationId,
      hardness: treasure.difficulty as Hardness,
      name: treasure.name,
      ownerId: userId,
      timeLimit: 60,
      gift:
        treasure.difficulty === "easy"
          ? 25
          : treasure.difficulty === "medium"
          ? 50
          : 100,
    });
  };

  const LocationInfoSubmitMutation = useLocationInfoSubmitMutation({
    onSuccess: (res) => {
      submitTreasure(res.data.id);
    },
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired") {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
      if (err) {
        notify.error("LocationInfo Submission is failed\n" + err);
      }
    },
  });

  const submitLocationInfo = () => {
    LocationInfoSubmitMutation.mutate({
      regionId: treasure.coordinate.regionId,
      altitude: 1,
      longitude: treasure.coordinate.lng,
      latitude: treasure.coordinate.lat,
    });
  };
  if (
    HintCreationMutation.isLoading ||
    LocationInfoSubmitMutation.isLoading ||
    TreasureSubmissionMutation.isLoading
  ) {
    return <Loader />;
  }
  if (HintCreationMutation.isSuccess) {
    setTreasure({
      name: "",
      regionName: "",
      difficulty: "easy",
      coordinate: {
        name: "My Treasure",
        lat: 0,
        lng: 0,
        regionId: -1,
      },
      hints: [{ content: "", cost: "", hintId: 0 }],
      deletedHints: [],
      images: [],
    });
    navigate(PATHS.MAINPAGE);
  }
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
                    state: { isEdit: false, treasureId: -1 },
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
                    hints: [...treasure.hints, { content: "", cost: "" }],
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
                    onClick={submitLocationInfo}
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
