import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiCreateHint,
  apiCreateLocation,
  apiCreateRegion,
  apiCreateTreasure,
  apiDeleteHint,
  apiDownloadImage,
  apiGetAllRegions,
  apiGetHintByTreasureId,
  apiGetLeaderboardByTreasureId,
  apiGetLocation,
  apiGetTreasureByOwnerId,
  apiGetTreasureByTreasureId,
  apiGetUser,
  apiLogin,
  apiUpdateHint,
  apiUpdateLocation,
  apiUpdateTreasure,
  apiUploadImage,
} from "./queries";
import { QUERY_KEYS } from "./queryKeys";
import { GeneralRegion, Hint, LocationInfo, Treasure, User } from "./types";

type CustomMutationProps = {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
};

const defaultQueryOptions = { cacheTime: 0, refetchOnWindowFocus: false };

export const useLoginMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useUser = (userId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: () => apiGetUser(userId),
    ...defaultQueryOptions,
  });
  const user: User = data?.data;
  return { user: user, ...rest };
};

export const useLocationInfoSubmitMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiCreateLocation,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useTreasureSubmissionMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiCreateTreasure,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useHintCreationMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiCreateHint,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useTreasureByTreasureId = (treasureId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["TreasureByTreasureId", treasureId],
    queryFn: () => apiGetTreasureByTreasureId(treasureId),
    ...defaultQueryOptions,
  });
  const treasure: Treasure = data?.data;
  return { treasureById: treasure, ...rest };
};

export const useHintByTreasureId = (treasureId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["HintByTreasureId", treasureId],
    queryFn: () => apiGetHintByTreasureId(treasureId),
    ...defaultQueryOptions,
  });
  const hintsByTresureId: Hint[] = data?.data.entities;
  return { hintsByTresureId: hintsByTresureId, ...rest };
};

export const useLocationInfo = (locationId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["LocationInfo", locationId],
    queryFn: () => apiGetLocation(locationId),
    ...defaultQueryOptions,
  });
  const locationInfo: LocationInfo = data?.data;
  return { locationInfo: locationInfo, ...rest };
};

export const useLocationUpdateMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUpdateLocation,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useTreasureUpdateMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUpdateTreasure,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useHintUpdateMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUpdateHint,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useHintDeleteMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiDeleteHint,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useTreasureByOwnerId = (ownerId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["TreasureByOwnerId", ownerId],
    queryFn: () => apiGetTreasureByOwnerId(ownerId),
    ...defaultQueryOptions,
  });
  const treasures: Treasure[] = data?.data.entities;
  return { treasuresByOwnerId: treasures, ...rest };
};

export const useRegionCreationMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiCreateRegion,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useRegions = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["AllRegions"],
    queryFn: apiGetAllRegions,
    ...defaultQueryOptions,
  });
  const regions: GeneralRegion[] = data?.data.entities;
  return { regions: regions, ...rest };
};

export const useUploadImageMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUploadImage,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useLeaderboard = (treasureId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["Leaderboard", treasureId],
    queryFn: () => apiGetLeaderboardByTreasureId(treasureId),
    ...defaultQueryOptions,
  });
  const leaderboard: any = data?.data;
  return { leaderboard: leaderboard, ...rest };
};

export const useDownloadedImage = (imageName: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["DownloadedImage", imageName],
    queryFn: () => apiDownloadImage(imageName),
    ...defaultQueryOptions,
  });
  const image: Blob = data?.data;
  return { image: image, ...rest };
};
