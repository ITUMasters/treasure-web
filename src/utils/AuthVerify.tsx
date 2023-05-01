import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

export type AuthVerifyType = {
  logout: () => void;
};
export const AuthVerify = ({ logout }: AuthVerifyType) => {
  let location = useLocation();
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken !== null && typeof accessToken === "string") {
      try {
        const decodedToken = jwtDecode(accessToken);
        const { exp } = decodedToken as { exp?: string };
        const expirationTime = parseInt(exp as string);
        if (expirationTime * 1000 < Date.now()) {
          logout();
        }
      } catch (err) {
        console.error(err);
        logout();
      }
    }
  }, [location, logout]);

  return <></>;
};
