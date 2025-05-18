import { CardFood } from "@/components/card-food";
import { RichTextRenderer } from "@/components/rich-text-rendering.tsx";
import { fetchHealthyRecipesSlug, fetchHealthyRecipesSlugNot } from "@/fetch";
import { ResponseTypeHealthy } from "@/types/articles";

import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  const recipies = await fetchHealthyRecipesSlug<ResponseTypeHealthy>(
    params.slug
  );
  const recipiesNot = await fetchHealthyRecipesSlugNot<ResponseTypeHealthy>(
    params.slug
  );

  return (
    <div className="w-full grid grid-cols-10 gap-2 p-2">
      <div className="h-auto w-full flex justify-center items-center flex-col col-span-7">
        <div className="h-120 w-full">
          {recipies?.data?.length ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipies.data[0].cover.url}`}
              width={500}
              height={500}
              alt={recipies?.data[0].title}
              className="w-full h-full object-cover"
            />
          ) : (
            <p>Não Existe receita</p>
          )}
        </div>
        <h1 className="h1_text">{recipies?.data[0].title}</h1>

        {recipies?.data?.length ? (
          <RichTextRenderer content={recipies?.data[0].content} />
        ) : (
          <p>Não Existe receita</p>
        )}
      </div>
      <div className="h-auto w-full flex justify-start items-center flex-col col-span-3 gap-2 ">
        {recipiesNot?.data.map((rel) => (
          <CardFood key={rel.id} recipes={rel} classProps="w-[80%]" />
        ))}
      </div>
    </div>
  );
}
