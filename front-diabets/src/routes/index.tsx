import CreateGlucose from "@/page/create-glucose";
import Home from "@/page/home";
import { Route, Routes } from "react-router";

export const RouterApp = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/create-glucose" element={<CreateGlucose />} />
    </Routes>
  );
};
