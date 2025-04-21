import { FaStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
}

export const StarRating = ({ rating }: RatingProps) => {
  const totalStars = 5;

  return (
    <div className="w-full flex gap-1 py-2">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className={`text-2xl ${
              starValue <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          />
        );
      })}
    </div>
  );
};
