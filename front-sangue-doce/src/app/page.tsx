import { HeaderBlog } from "@/components/header-blog";
import { HeroBlog } from "@/components/hero-blog";
import { MostReadOfTheWeek } from "@/components/most-read-of-the-week";

import { fetchArticles } from "@/fetch";
import { ResponseTypeArticles } from "@/types/articles";

export default async function Home() {
  const start = Date.now();
  const articles: ResponseTypeArticles = await fetchArticles(
    "pagination[limit]=5",
    ""
  );
  console.log("Tempo total da fetchArticles:", Date.now() - start, "ms");

  return (
    <>
      <HeaderBlog />
      <main className=" container mx-auto relative min-h-screen overflow-hidden">
        <HeroBlog articles={articles} />
        <MostReadOfTheWeek />
      </main>
    </>
  );
}
