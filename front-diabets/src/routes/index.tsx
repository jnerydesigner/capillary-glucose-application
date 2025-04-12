import Login from "@/page/login";
import CreateGlucose from "@/page/create-glucose";
import Home from "@/page/home";
import RootLayout from "@/page/layout";
import { Route, Routes } from "react-router";

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<RootLayout />}>
        <Route path="/glucose-measurement" element={<Home />} />
        <Route path="/create-glucose" element={<CreateGlucose />} />
      </Route>
    </Routes>
  );
};
