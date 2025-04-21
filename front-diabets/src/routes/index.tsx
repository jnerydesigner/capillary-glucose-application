import Login from "@/page/login";
import CreateGlucose from "@/page/create-glucose";
import Home from "@/page/home";
import RootLayoutDashboard from "@/page/root-layout-dashboard";
import { Route, Routes } from "react-router";
import RootLayoutBlog from "@/page/root-layout-blog";
import HomeBlog from "@/page/blog/home";
import About from "@/page/blog/about";
import Contact from "@/page/blog/contact";
import EatingHealthy from "@/page/blog/eating-healthy";
import Shop from "@/page/blog/shop";
import FoodArticle from "@/page/blog/food";

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayoutBlog />}>
        <Route path="/" element={<HomeBlog />} />
        <Route path="/blog/about" element={<About />} />
        <Route path="/blog/contact" element={<Contact />} />
        <Route path="/blog/eating-healthy" element={<EatingHealthy />} />
        <Route path="/blog/shop" element={<Shop />} />
        <Route path="/blog/food/:slug" element={<FoodArticle />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route element={<RootLayoutDashboard />}>
        <Route path="/glucose-measurement" element={<Home />} />
        <Route path="/create-glucose" element={<CreateGlucose />} />
      </Route>
    </Routes>
  );
};
