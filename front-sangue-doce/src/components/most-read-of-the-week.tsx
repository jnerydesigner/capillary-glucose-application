import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";
import { CardMostRead } from "./card-most-read";

export const MostReadOfTheWeek = () => {
  return (
    <div className="w-full mt-2 p-4 bg-pink-300">
      <div className="flex justify-between items-center">
        <h3>Mais Lidas da Semana</h3>
        <Link
          href="/most-read-week"
          className="flex justify-center items-center"
        >
          Ver Tudo <HiArrowNarrowRight className="ml-2" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-4">
        <CardMostRead />
        <CardMostRead />
        <CardMostRead />
        <CardMostRead />
      </div>
    </div>
  );
};
