import { HeaderBlog } from "@/components/header-blog";
import React from "react";
import Head from "next/head";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Minha Aplicação</title>
      </Head>

      <HeaderBlog />
      <main className="container mx-auto bg-amber-200">{children}</main>
    </>
  );
};

export default RootLayout;
