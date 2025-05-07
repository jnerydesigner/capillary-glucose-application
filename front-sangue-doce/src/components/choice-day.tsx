"use client";

import { fetchRecipesChoiceDay } from "@/fetch";
import { ResponseTypeHealthy } from "@/types/articles";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ChoiceDay = () => {
  const [recipes, setRecipes] = useState<ResponseTypeHealthy>({
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
    const fetchRecipesData = async () => {
      try {
        const data = await fetchRecipesChoiceDay(120);
        setRecipes(data);
      } catch {
        setError("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipesData();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
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
    <section className="w-full h-50 my-6">
      <div className="h-14 flex justify-center items-center mb-10">
        <h2 className="w-120 p-10 text-3xl">Cardapio de Hoje</h2>
        <div className="dividerSection"></div>
      </div>
      <div>
        <div className="w-50">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipes.data[0].cover.url}`}
            alt={recipes.data[0].title}
            className="w-full h-full object-cover"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </section>
  );
};
