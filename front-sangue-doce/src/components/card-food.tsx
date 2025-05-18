import { HealthyType } from "@/types/articles";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AiFillFire } from "react-icons/ai";

type CardFoodProps = {
  recipes: HealthyType;
  classProps?: string;
};

export const CardFood = ({ recipes, classProps }: CardFoodProps) => {
  return (
    <Link
      href={`/blog/food/${recipes.slug}`}
      className={classProps ? classProps : ""}
    >
      <div className="w-full h-[400px] flex justify-between items-center gap-2 flex-col border rounded-[8px] shadow">
        <div className="w-full h-[180px] rounded-t-[8px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipes.cover.url}`}
            alt={recipes.title}
            className="w-full h-full object-cover rounded-t-[8px]"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full h-[210px] flex justify-center items-center flex-col px-2">
          <div className="w-full h-12 flex justify-center items-center">
            <StarRating rating={recipes.stars} />
          </div>
          <h2 className="w-full text-left my-2 h-12">{recipes.title}</h2>

          <div className="w-full flex justify-center items-center">
            <div className="w-[120px] h-14 flex justify-start items-center gap-2 py-4">
              <Avatar>
                <AvatarImage src={recipes.author.avatar_url} />
                <AvatarFallback>{recipes.author.name}</AvatarFallback>
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
