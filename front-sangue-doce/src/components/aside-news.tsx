import { getArticleWithMoreClick } from "@/fetch";
import { LimitedTextByWords } from "@/lib/limited-text-by-words";
import { ResponseTypeArticles } from "@/types/articles";
import Image from "next/image";
import Link from "next/link";

interface AsideNewsProps {
  slug: string;
}

export const revalidate = 3600;

export const AsideNews = async ({ slug }: AsideNewsProps) => {
  const articles: ResponseTypeArticles = await getArticleWithMoreClick(slug);

  return (
    <aside className="flex justify-start items-center flex-col p-2">
      <div className="w-full h-10 bg-gray-100 flex justify-start items-center">
        <h1 className="text-center w-full">Mais Vistos</h1>
      </div>

      {articles.data.map((article) => (
        <Link
          href={`/blog/articles/${article.slug}`}
          className="w-full h-auto p-2"
          key={article.id}
        >
          <div className="w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.formats.medium.url}`}
              alt={article.title}
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
              priority
            />
          </div>
          <div className="p-2 bg-gray-100 shadow">
            <h2 className="text-center my-2 font-bold">{article.title}</h2>
            <p className="text-justify">
              {LimitedTextByWords(article.sub_title, 20)}
            </p>
          </div>
        </Link>
      ))}
    </aside>
  );
};
