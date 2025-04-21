import { fetchHealthyRecipesSlug } from "@/api";
import { RichTextRenderer } from "@/components/tich-text-rendering.tsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const FoodArticle = () => {
  const { slug } = useParams();
  if (!slug) {
    throw new Error("Slug not defined");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["healthy-recipes-slug"],
    queryFn: () => fetchHealthyRecipesSlug(slug),
  });

  if (isLoading || !data) {
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

  return (
    <div className="w-full flex justify-center items-center flex-col my-2">
      <div className="w-full h-[500px]">
        <img
          src={`${import.meta.env.VITE_STRAPI_API_URL}${
            data.data[0].cover.url
          }`}
          alt={data.data[0].title}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-[3rem]">{data.data[0].title}</h1>
      <div>
        <RichTextRenderer content={data.data[0].content} />
      </div>
    </div>
  );
};

export default FoodArticle;
