import { Star } from "lucide-react";

export const Rating = ({
  rating,
  ratingCount,
}: {
  rating: number;
  ratingCount: number;
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = Math.floor(5 - rating);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} className="fill-yellow-300" strokeWidth={1} />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <Star key="half" className="fill-yellow-300" size="16" />
        )}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <Star
            key={index + fullStars + (hasHalfStar ? 1 : 0)}
            stroke="#a3a3a3"
          />
        ))}
      </div>
      <p className="text-sm">Ratings count: {ratingCount}</p>
    </div>
  );
};
