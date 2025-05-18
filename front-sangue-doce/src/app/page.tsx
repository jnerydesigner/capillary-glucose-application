import { HeaderBlog } from "@/components/header-blog";
import { HeroBlog } from "@/components/hero-blog";

import { fetchArticles } from "@/fetch";
import { ResponseTypeArticles } from "@/types/articles";

export default async function Home() {
  const articles: ResponseTypeArticles = await fetchArticles(
    "pagination[limit]=5"
  );

  return (
    <>
      <HeaderBlog />
      <main className=" container mx-auto relative min-h-screen overflow-hidden">
        <HeroBlog articles={articles} />
      </main>
    </>
  );
}
