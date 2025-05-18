import React from "react";
import Head from "next/head";
import { ResponseTypeArticles } from "@/types/articles";
import { fetchArticles } from "@/fetch";

import { AsideNews } from "@/components/aside-news";

const LayoutArticle = async ({ children }: { children: React.ReactNode }) => {
  const articles: ResponseTypeArticles = await fetchArticles(
    "pagination[limit]=5"
  );
  return (
    <>
      <Head>
        <title>Article</title>
      </Head>
      <div className="grid grid-cols-12 gap-4">
        <main className="h-auto col-span-9 flex justify-start items-center flex-col p-2">
          {children}
        </main>
        <AsideNews articlesData={articles} />
      </div>
    </>
  );
};

export default LayoutArticle;
