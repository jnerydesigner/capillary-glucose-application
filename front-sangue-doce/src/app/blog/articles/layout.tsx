import React from "react";
import Head from "next/head";

const LayoutArticle = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Article</title>
      </Head>
      <div className="grid grid-cols-12 gap-4">
        <main className="h-auto col-span-9 flex justify-start items-center flex-col p-2">
          {children}
        </main>
        <aside className="col-span-3 flex justify-start items-center flex-col bg-pink-400">
          <div>
            <h4>Teste</h4>
          </div>
        </aside>
      </div>
    </>
  );
};

export default LayoutArticle;
