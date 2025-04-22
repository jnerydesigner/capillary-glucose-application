import { fetchHealthyRecipes, fetchHealthyRecipesSlug } from "@/api";
import { PostAuthor } from "@/components/post-author";
import { RichTextRenderer } from "@/components/tich-text-rendering.tsx";
import { useBlogFood } from "@/context/blog-food";
import { HealthyType, ResponseTypeHealthy } from "@/types-dto";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

// função fora do componente
const filterRecipes = (response: ResponseTypeHealthy, currentId: number) => {
  if (!response?.data) {
    throw new Error("Data not exists");
  }
  return response.data.filter((recipe) => recipe.id !== currentId);
};

export const FoodArticle = () => {
  const { slug } = useParams();
  const { setImageBgBlogFood } = useBlogFood();

  if (!slug) throw new Error("Slug not defined");

  const [filteredRecipes, setFilteredRecipes] = useState<HealthyType[]>([]);

  const {
    data: recipes,
    isLoading: loadingRecipes,
    isSuccess: successRecipes,
  } = useQuery({
    queryKey: ["healthy-recipes"],
    queryFn: () => {
      const paginate = `pagination[limit]=4`;
      return fetchHealthyRecipes(paginate);
    },
  });

  const {
    data,
    isLoading: loadingSlug,
    isSuccess: successSlug,
  } = useQuery({
    queryKey: ["healthy-recipes-slug", slug],
    queryFn: () => fetchHealthyRecipesSlug(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if (successRecipes && recipes && data?.data?.[0]?.id) {
      const currentId = data.data[0].id;
      const filtered = filterRecipes(recipes, currentId);
      setFilteredRecipes(filtered);
    }
  }, [successRecipes, recipes, data]);

  useEffect(() => {
    if (successSlug && data?.data?.[0]?.cover?.url) {
      setImageBgBlogFood(
        `${import.meta.env.VITE_STRAPI_API_URL}${data.data[0].cover.url}`
      );
    }
  }, [successSlug, data]);

  if (loadingSlug || loadingRecipes || !data) {
    return (
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col md:grid md:grid-cols-6 gap-4 md:items-start mt-2 mb-10 px-2">
      <div className="col-span-4 w-full flex justify-center items-center md:items-start flex-col">
        <div className="w-full md:w-full h-[180px] md:h-[500px]">
          <img
            src={`${import.meta.env.VITE_STRAPI_API_URL}${
              data.data[0].cover.url
            }`}
            alt={data.data[0].title}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-[1.8rem] md:text-[3rem]">{data.data[0].title}</h1>
        <div>
          <RichTextRenderer content={data.data[0].content} />
        </div>
      </div>

      <div className="col-span-2 w-full flex justify-center items-start flex-col">
        <PostAuthor author={data.data[0].author} />

        {filteredRecipes.map((res) => (
          <Link to={`/blog/food/${res.slug}`} key={res.id} className="mb-4">
            <div>
              <div className="w-full h-[300px]">
                <img
                  src={`${import.meta.env.VITE_STRAPI_API_URL}${res.cover.url}`}
                  alt={res.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-red-500/25 p-2 h-16 flex justify-center items-center">
                <h3 className="text-black text-center">{res.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
