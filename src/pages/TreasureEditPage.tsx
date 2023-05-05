import React, { useMemo, useState } from "react";
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
  useHintCreationMutation,
  useHintDeleteMutation,
  useHintUpdateMutation,
  useLocationUpdateMutation,
  useTreasureByTreasureId,
  useTreasureUpdateMutation,
  useUploadImageMutation,
} from "../react-query/hooks";
import { StateSetter } from "../ui/StateSetter";
import { hint } from "../recoil-store/treasureStore";
import { LocationGetter } from "../ui/LocationGetter";
import { formatError } from "../utils/formatError";
import { useNotify } from "../hooks/useNotify";
import { Hardness } from "../react-query/types";
import { Loader } from "../ui/Loader";
import { AxiosError } from "axios";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { ImageDownloader } from "../ui/ImageDownloader";

export function TreasureEditPage() {
  const navigate = useNavigate();
  const treasure = useTreasure();
  const setTreasure = useSetTreasure();
  const [isUploadedNew, setIsUploadedNew] = useState(false);

  const onChange = (imageList: ImageListType) => {
    setIsUploadedNew(true);
    setTreasure({ ...treasure, images: imageList as never[] });
  };
  const location = useLocation();

  const { treasureById, isFetching } = useTreasureByTreasureId(
    location.state?.treasureId
  );
  const comingFromMap = location.state && location.state.comingFromMap;

  const hintsByTresureId = useHintByTreasureId(location.state?.treasureId);
  const notify = useNotify();
  const [imageLink, setImageLink] = useState("");

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
    const c4 = treasure.images.length === 0;
    return c1 || c2 || c3 || c4;
  }, [treasure]);

  const setId = useSetId();
  const setAuth = useSetAuth();
  const HintDeleteMutation = useHintDeleteMutation({
    onSuccess: (res) => {},
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
      if (err) {
        notify.error("Hint Deletion Fail\n" + err);
      }
    },
  });

  const deleteHint = (hintId: number) => {
    HintDeleteMutation.mutate(hintId);
  };

  const HintCreationMutation = useHintCreationMutation({
    onSuccess: (res) => {},
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
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

  const HintUpdateMutation = useHintUpdateMutation({
    onSuccess: (res) => {},
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
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
        const hintInTheLoop = treasure.hints[i];
        if (hintInTheLoop.hintId === 0) {
          createHint(res.data.id, hintInTheLoop, i === 0);
        } else {
          updateHint(treasure.hints[i], i === 0);
        }
      }
      for (let i = 0; i < treasure.deletedHints.length; i++) {
        deleteHint(treasure.deletedHints[i].hintId as number);
      }
      setTreasure({ ...treasure, deletedHints: [] });
    },
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
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
      photoLink: isUploadedNew ? imageLink : treasureById.photoLink,
    });
  };

  const LocationUpdateMutation = useLocationUpdateMutation({
    onSuccess: (res) => {
      updateTreasure(location.state?.treasureId);
    },
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
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

  const [isUpload, setIsUpload] = useState(false);

  const uploadImageMutation = useUploadImageMutation({
    onSuccess: (res) => {
      setImageLink(res.data.fileName);
      updateLocation();
    },
    onError: (error) => {
      const err = formatError(error);
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        setId(0);
        setAuth(false);
        localStorage.removeItem("access_token");
      }
      if (err) {
        notify.error("Image upload is failed\n" + err);
      }
    },
  });

  const uploadImage = () => {
    if (!isUploadedNew) {
      updateLocation();
      return;
    }
    if (treasure.images.length === 0) return;
    const imageSize = Object.hasOwn(treasure.images[0], "dataURL")
      ? treasure.images[0].file.size
      : treasure.images[0].size;
    const file = Object.hasOwn(treasure.images[0], "dataURL")
      ? treasure.images[0].file
      : treasure.images[0];
    if (imageSize > 10000000) return;
    const formData = new FormData();
    formData.append("image", file);
    uploadImageMutation.mutate(formData);
  };

  if (isFetching || hintsByTresureId.isFetching) {
    return <Loader />;
  }
  if (
    uploadImageMutation.isLoading ||
    HintCreationMutation.isLoading ||
    LocationUpdateMutation.isLoading ||
    TreasureUpdateMutation.isLoading ||
    HintUpdateMutation.isLoading ||
    HintDeleteMutation.isLoading
  ) {
    return <Loader />;
  }
  if (TreasureUpdateMutation.isSuccess) {
    navigate(PATHS.MAINPAGE, { state: { clearTreasure: true } });
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

  const imageName = treasureById.photoLink;
  if (
    isUpload &&
    treasure.images.length > 0 &&
    !Object.hasOwn(treasure.images[0], "dataURL")
  ) {
    setIsUpload(false);
  }
  return (
    <div className="bg-bgColor flex flex-row min-h-screen">
      <StateSetter
        setSpecificState={() => {
          if (imageName !== null) {
            setIsUpload(true);
          }
        }}
      />
      {imageName !== null && (
        <ImageDownloader imageName={imageName as string} />
      )}
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
                      locationInfo: {
                        coordinate: treasure.coordinate,
                        regionName: treasure.regionName,
                      },
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
                      onChange={(e) => {
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
                        });
                      }}
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
                          deletedHints:
                            treasure.hints[index].hintId !== 0
                              ? [
                                  ...treasure.deletedHints,
                                  treasure.hints[index],
                                ]
                              : treasure.deletedHints,
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
            {({ onImageUpload, dragProps }) => (
              <div {...dragProps}>
                {isUpload ? (
                  <Loader height="50%" width="50%" color="#FFFFFF" />
                ) : (
                  <img
                    src={
                      treasure.images.length > 0
                        ? !Object.hasOwn(treasure.images[0], "dataURL")
                          ? URL.createObjectURL(treasure.images[0])
                          : treasure.images[0].dataURL
                        : require("../assets/images/Photo Placeholder.png")
                    }
                    alt="imageUploadPlace"
                    width={1183 / 4}
                    height={1860 / 4}
                  />
                )}
                <div className="mt-8">
                  <Button size="large" onClick={onImageUpload}>
                    Select Treasure Image
                  </Button>
                </div>
                <div className="mt-8">
                  <Button
                    size="large"
                    disabled={isButtonDisabled}
                    HasFadeColor={isButtonDisabled}
                    onClick={uploadImage}
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
