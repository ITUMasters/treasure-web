import React from "react";
import "./styles/App.css";
import { MapPage } from "./pages/MapPage";
import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { TreasureCreationPage } from "./pages/TreasureCreationPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { PATHS } from "./consts/paths";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Createds } from "./pages/Createds";
import { Leaderboard } from "./pages/Leaderboard";
import { useAuth } from "./recoil-store/auth/AuthStoreHooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TreasureEditPage } from "./pages/TreasureEditPage";
import { RegionCreationPage } from "./pages/RegionCreationPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <AppWithRecoil />
          <ToastContainer draggable theme={"dark"} />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

function AppWithRecoil() {
  const auth = useAuth();
  const location = useLocation();

  return (
    <Routes>
      {!auth && <Route path={PATHS.LOGIN} element={<LoginPage />} />}
      {auth && (
        <>
          <Route
            path={PATHS.MAP}
            element={
              location.state !== null && location.state.isEdit !== null ? (
                <MapPage />
              ) : (
                <MainPage />
              )
            }
          />
          <Route
            path={PATHS.TREASUREFABRICATION}
            element={<TreasureCreationPage />}
          />
          <Route path={PATHS.MAINPAGE} element={<MainPage />} />
          <Route path={PATHS.CREATEDS} element={<Createds />} />
          <Route
            path={PATHS.LEADERBOARD}
            element={
              location.state !== null && location.state.isTreasure !== null ? (
                <Leaderboard />
              ) : (
                <MainPage />
              )
            }
          />
          <Route
            path={PATHS.EDITTREASURE}
            element={
              location.state !== null && location.state.treasureId !== null ? (
                <TreasureEditPage />
              ) : (
                <TreasureCreationPage />
              )
            }
          />
        </>
      )}
      {auth && (
        <Route path={PATHS.REGIONCREATION} element={<RegionCreationPage />} />
      )}
      {!auth && <Route path="*" element={<LoginPage />} />}
      {auth && <Route path="*" element={<MainPage />} />}
    </Routes>
  );
}

export default App;
