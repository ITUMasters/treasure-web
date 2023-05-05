import { useDownloadedImage } from "../react-query/hooks";
import {
  useSetTreasure,
  useTreasure,
} from "../recoil-store/treasureStoreHooks";
import { Loader } from "./Loader";
import { StateSetter } from "./StateSetter";

export type ImageDownloaderProps = {
  imageName: string;
};
export const ImageDownloader = ({ imageName }: ImageDownloaderProps) => {
  const { image, isFetching } = useDownloadedImage(imageName);
  const treasure = useTreasure();
  const setTreasure = useSetTreasure();
  if (isFetching) {
    return <Loader />;
  }
  return (
    <StateSetter
      setSpecificState={() => {
        setTreasure({ ...treasure, images: [image] });
      }}
    />
  );
};
