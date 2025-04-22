import { HeaderBlog } from "@/components/header-blog";
import { useBlogFood } from "@/context/blog-food";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function RootLayoutBlog() {
  const { imageBgBlogFood } = useBlogFood();
  const [imageBg, setImageBg] = useState("");
  useEffect(() => {
    if (imageBgBlogFood) {
      console.log(imageBgBlogFood);
      setImageBg(imageBgBlogFood);
    }
  }, [imageBgBlogFood]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fundo com blur e transparência */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          opacity: 0.9,
        }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl bg-gray-200 bg-opacity-80">
        <HeaderBlog />
        <Outlet />
      </div>
    </main>
  );
}
