import { dateFormatBlogType } from "@/lib/date-format-blog-type";
import { ResponseTypeArticles } from "@/types/articles";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
interface Articles {
  articles: ResponseTypeArticles;
}

export const HeroBlog = ({ articles }: Articles) => {
  return (
    <section className="grid grid-cols-3 gap-4 px-4 my-4">
      <Link
        href={`/blog/articles/${articles.data[0].slug}`}
        className="col-span-1 relative rounded-lg overflow-hidden shadow-md"
      >
        <div>
          <div className="absolute right-2 top-2">
            <FaRegHeart className="text-[2.6rem] text-red-500 relative" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[1rem] font-bold text-red-500">
              {articles.data[0].likes}
            </span>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${articles.data[0].cover.url}`}
            alt={articles.data[0].title}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white flex flex-col justify-end">
            <span className="bg-red-500 text-white px-3 py-1 rounded text-xs w-fit mb-2">
              {articles.data[0].category.name}
            </span>
            <h2 className="text-xl font-bold">{articles.data[0].title}</h2>
            <div className="flex gap-4 text-sm mt-2 text-gray-300">
              <span>👤 {articles.data[0].author.name}</span>
              <span>📅 {dateFormatBlogType(articles.data[0].publishedAt)}</span>
              {/* <span>⏱ {calculateReadingTime(articles.data[0].content)}</span> */}
            </div>
          </div>
        </div>
      </Link>
      <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
        {articles.data &&
          articles.data.map((notice) => {
            if (notice.id !== articles.data[0].id) {
              return (
                <Link
                  key={notice.id}
                  href={`/blog/articles/${notice.slug}`}
                  className="relative rounded-lg overflow-hidden shadow-sm"
                >
                  <div>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${notice.cover.url}`}
                      alt={notice.title}
                      className="w-full h-full object-cover"
                      width={200}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-white flex flex-col justify-end">
                      <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-xs w-fit mb-1">
                        {notice.category.name}
                      </span>
                      <p className="text-sm font-semibold leading-tight">
                        {notice.title}
                      </p>
                      <div className="flex gap-4 text-sm mt-2 text-gray-300">
                        2222
                      </div>
                      <span className="text-xs text-gray-300 mt-1">
                        📅 {dateFormatBlogType(notice.publishedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </section>
  );
};
