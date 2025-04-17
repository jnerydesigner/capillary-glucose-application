import { HeaderBlog } from "@/components/header-blog";
import { Outlet } from "react-router";

export default function RootLayoutBlog() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-7xl">
        <HeaderBlog />
        <Outlet />
      </div>
    </main>
  );
}
