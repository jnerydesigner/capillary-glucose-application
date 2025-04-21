import { AiFillFire } from "react-icons/ai";
import { StarRating } from "./star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router";
import { HealthyType } from "@/types-dto";

interface CardProps {
  recipes: HealthyType;
}

export const CardFood = ({ recipes }: CardProps) => {
  console.log(recipes);
  return (
    <Link to={`/blog/food/${recipes.slug}`}>
      <div className="h-[400px] flex justify-between items-center flex-col border rounded-[8px] shadow">
        <div className="w-full h-[180px] rounded-t-[8px]">
          <img
            src={`${import.meta.env.VITE_STRAPI_API_URL}${recipes.cover.url}`}
            alt="chicken"
            className="w-full h-full object-cover rounded-t-[8px]"
          />
        </div>
        <div className="w-full flex justify-center items-center flex-col p-4">
          <StarRating rating={recipes.stars} />
          <h2 className="w-full text-left my-2">{recipes.title}</h2>

          <div className="w-full flex justify-center items-center">
            <div className="w-[120px] flex justify-start items-center gap-2 py-4">
              <Avatar>
                <AvatarImage src="https://github.com/jnerydesigner.png" />
                <AvatarFallback>JN</AvatarFallback>
              </Avatar>
              <h3 className="text-[0.8rem]">{recipes.author.name}</h3>
            </div>
            <div className="flex-1 flex justify-center items-center gap-2 border-2 px-4 py-2 rounded-[8px] shadow">
              <AiFillFire className="text-red-500" />
              <p>{recipes.calories} calorias</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
