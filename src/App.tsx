import React from "react";
import "./styles/App.css";
import { MapPage } from "./pages/MapPage";
import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <AppWithRecoil />
          <ToastContainer draggable theme={"light"} />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

function AppWithRecoil() {
  const auth = useAuth();
  console.log(auth);
  return (
    <Routes>
      {!auth && <Route path={PATHS.LOGIN} element={<LoginPage />} />}
      {auth && (
        <>
          <Route path={PATHS.MAP} element={<MapPage />} />
          <Route
            path={PATHS.TREASUREFABRICATION}
            element={<TreasureCreationPage />}
          />
          <Route path={PATHS.MAINPAGE} element={<MainPage />} />
          <Route path={PATHS.CREATEDS} element={<Createds />} />
          <Route path={PATHS.LEADERBOARD} element={<Leaderboard />} />
        </>
      )}
      {!auth && <Route path="*" element={<LoginPage />} />}
      {auth && <Route path="*" element={<MainPage />} />}
    </Routes>
  );
}

export default App;
