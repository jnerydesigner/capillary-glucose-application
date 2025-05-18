// "use client";

import { CardFood } from "@/components/card-food";
import { HeroFood } from "@/components/hero-food";
import { fetchHealthyRecipes } from "@/fetch";
import { ResponseTypeHealthy } from "@/types/articles";

export default async function EatingHealthy() {
  const healthy = await fetchHealthyRecipes<ResponseTypeHealthy>("");
  return (
    <>
      <HeroFood />
      <div className="w-full flex justify-center items-center flex-col md:grid md:grid-cols-4 gap-2 my-3 p-4">
        {healthy &&
          healthy.data.map((recipes) => (
            <CardFood key={recipes.id} recipes={recipes} />
          ))}
      </div>
    </>
  );
}
