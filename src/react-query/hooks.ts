import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiCreateHint,
  apiCreateLocation,
  apiCreateTreasure,
  apiGetHintByTreasureId,
  apiGetLocation,
  apiGetTreasureByTreasureId,
  apiGetUser,
  apiLogin,
} from "./queries";
import { QUERY_KEYS } from "./queryKeys";
import { Hint, LocationInfo, Treasure, User } from "./types";

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
