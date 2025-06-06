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
      <main className="h-auto container mx-auto bg-stone-400">{children}</main>
      
    </>
  );
};

export default RootLayout;
