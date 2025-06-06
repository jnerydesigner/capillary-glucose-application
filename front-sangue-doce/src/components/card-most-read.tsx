import { fetchArticlesMoreRead } from "@/fetch";
import { dateFormatBlogType } from "@/lib/date-format-blog-type";
import { ResponseTypeArticles } from "@/types/articles";
import Image from "next/image";
import Link from "next/link";

export const CardMostRead = async () => {
  const { data: article } = await fetchArticlesMoreRead<ResponseTypeArticles>();
  return (
    <Link
      key={article[0].id}
      href={`/blog/articles/${article[0].slug}`}
      className="relative rounded-lg overflow-hidden shadow-sm"
    >
      <div>
        <div className="w-full h-[250px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article[0].cover.formats.medium.url}`}
            alt={article[0].title}
            className="w-full h-full object-cover"
            width={200}
            height={200}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-white flex flex-col justify-end">
          <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-xs w-fit mb-1">
            {article[0].category.name}
          </span>
          <p className="text-sm font-semibold leading-tight">
            {article[0].title}
          </p>
          <span className="text-xs text-gray-300 mt-1">
            📅 {dateFormatBlogType(article[0].publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};
