import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
};

export const StarRating = ({ rating }: StarRatingProps) => {
  const totalStars = 5;
  return (
    <div className="w-full flex gap-1 py-2">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className={`text-2xl 
                            ${
                              starValue <= rating
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }`}
          />
        );
      })}
    </div>
  );
};
