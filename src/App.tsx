import React from "react";
import "./styles/App.css";
import { MapPage } from "./pages/MapPage";
import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { TreasureCreationPage } from "./pages/TreasureCreationPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { PATHS } from "./consts/paths";
import { Createds } from "./pages/Createds";
import { Leaderboard } from "./pages/Leaderboard";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppWithRecoil />
      </BrowserRouter>
    </RecoilRoot>
  );
}

function AppWithRecoil() {
  return (
    <Routes>
      <Route path={PATHS.MAP} element={<MapPage />} />
      <Route
        path={PATHS.TREASUREFABRICATION}
        element={<TreasureCreationPage />}
      />
      <Route path={PATHS.LOGIN} element={<Leaderboard />} />
      <Route path={PATHS.MAINPAGE} element={<MainPage />} />
      <Route path={PATHS.CREATEDS} element={<Createds />} />
      <Route path={PATHS.LEADERBOARD} element={<Leaderboard />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
