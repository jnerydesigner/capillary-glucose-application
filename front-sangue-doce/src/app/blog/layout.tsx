import { HeaderBlog } from "@/components/header-blog";
import React from "react";
import Head from "next/head";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Minha Aplicação</title>
      </Head>
      <div className="relative z-10 container mx-auto max-w-7xl bg-gray-600 bg-opacity-80">
        <HeaderBlog />
        <main className="mt-50">{children}</main>
      </div>
    </>
  );
};

export default RootLayout;
