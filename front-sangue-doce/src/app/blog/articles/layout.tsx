import React from "react";
import Head from "next/head";

const LayoutArticle = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Article</title>
      </Head>
      <div className="grid grid-cols-12 gap-4">{children}</div>
    </>
  );
};

export default LayoutArticle;
