"use client";

import { HeaderBlog } from "@/components/header-blog";
import { HeroBlog } from "@/components/hero-blog";
import { ChoiceDay } from "@/components/choice-day";
import { fetchArticles } from "@/fetch";
import { ResponseTypeArticles } from "@/types/articles";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<ResponseTypeArticles>({
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 5,
        pageCount: 1,
        total: 0,
      },
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const pagination = "pagination[limit]=5";
        const data = await fetchArticles(pagination);
        setArticles(data);
      } catch {
        setError("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticlesData();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <HeaderBlog />
      <main className="relative min-h-screen overflow-hidden">
        <HeroBlog articles={articles} />
        {/* <ChoiceDay /> */}
      </main>
    </>
  );
}
