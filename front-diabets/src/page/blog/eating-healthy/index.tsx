import { fetchHealthyRecipes } from "@/api";
import { CardFood } from "@/components/card-food";
import { useQuery } from "@tanstack/react-query";

export default function EatingHealthy() {
  const { data, isLoading } = useQuery({
    queryKey: ["healthy-recipes"],
    queryFn: () => fetchHealthyRecipes(""),
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
      <div className="h-[400px] w-full mt-4 grid grid-rows-2 md:grid-cols-2 gap-4 p-4">
        <div className="flex justify-center items-center flex-col order-2 md:order-1">
          <h2 className="text-[2rem]">
            Sua Jornada Diária da{" "}
            <span className="text-green-700 font-bold">
              Alimentação Saudável
            </span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
            dolores suscipit ipsum inventore esse, quis necessitatibus
            blanditiis laboriosam iure, consectetur totam illo sint laudantium
            eum reiciendis ipsam maxime nesciunt dignissimos!
          </p>
        </div>
        <div className="flex justify-center items-center order-1 md:order-2">
          <div className="h-[400px] w-[400px]">
            <img
              src="/sanduiche.png"
              alt="Sanduiche saudável"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col md:grid md:grid-cols-4 gap-2 my-3 p-4">
        {data.data &&
          data.data.map((recipes) => (
            <CardFood key={recipes.id} recipes={recipes} />
          ))}
      </div>
    </div>
  );
}
