import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalStars?: number; // Default is 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-gray-600 text-sm">
        ({rating}/{totalStars})
      </span>
    </div>
  );
};

export default StarRating;
