import Login from "@/page/login";
import CreateGlucose from "@/page/create-glucose";
import Home from "@/page/home";
import RootLayoutDashboard from "@/page/root-layout-dashboard";
import { Route, Routes } from "react-router";
import RootLayoutBlog from "@/page/root-layout-blog";
import HomeBlog from "@/page/blog/home";

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayoutBlog />}>
        <Route path="/" element={<HomeBlog />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route element={<RootLayoutDashboard />}>
        <Route path="/glucose-measurement" element={<Home />} />
        <Route path="/create-glucose" element={<CreateGlucose />} />
      </Route>
    </Routes>
  );
};
