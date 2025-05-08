// src/app/blog/articles/[slug]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchArticleBySlug } from "@/fetch";
import { RichTextRenderer } from "@/components/tich-text-rendering.tsx";
import { ResponseTypeArticles } from "@/types/articles";
import Image from "next/image";

export default function Page() {
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [article, setArticle] = useState<ResponseTypeArticles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const stringUrl = "/blog/articles/";
      const pathSlug = pathname.substring(stringUrl.length);
      setSlug(pathSlug as string); // Atualiza o estado do slug
    }
  }, [pathname]); // Reexecuta quando o slug na URL mudar

  useEffect(() => {
    if (!slug) return; // Se não tiver slug, não faz a requisição

    const fetchArticle = async () => {
      try {
        const data: ResponseTypeArticles = await fetchArticleBySlug(slug);
        console.log(data);
        setArticle(data);
      } catch {
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]); // Recarrega os dados do artigo sempre que o slug mudar

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="p-10">
      <div className="w-full h-[500px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.data[0].cover.url}`}
          alt={article.data[0].title}
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
          priority
        />
      </div>
      <h1 className="text-center text-3xl my-10 font-bold">
        {article.data[0].title}
      </h1>
      <RichTextRenderer content={article.data[0].contentNew} />
    </div>
  );
}
