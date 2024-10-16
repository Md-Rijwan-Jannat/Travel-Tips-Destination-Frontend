import { useEffect } from "react";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import { TUser } from "../types";

export const useUser = () => {
  const {
    data: userData,
    isFetching,
    error,
    refetch,
  } = useGetMeQuery(undefined);

  const userInfo = userData?.data as TUser | undefined;

  useEffect(() => {
    if (!userInfo?.email && !isFetching) {
      console.log("User not authenticated or data not available.");
    }
  }, [userInfo, isFetching]);

  return { userInfo, isFetching, error, refetch };
};
