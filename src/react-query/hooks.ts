import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGetUser, apiLogin } from "./queries";
import { QUERY_KEYS } from "./queryKeys";
import { User } from "./types";

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
