import { Header } from "@/components/header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-7xl">
        <Header />
        <Outlet />
      </div>
    </main>
  );
}
