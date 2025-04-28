import { useMemo } from "react";
import { Review, ReviewContent } from "../types";

const useReviewColor = (reviews: Review[]) => {
  const getAverage = (category: keyof ReviewContent) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce(
      (acc, review) =>
        acc + (typeof review.content[category] === "number" ? review.content[category] : 0),
      0
    );

    return total / reviews.length;
  };

  const categoryColor = useMemo(() => {
    const categories: (keyof ReviewContent)[] = [
      "taste",
      "mood",
      "kind",
      "comfort",
      "wifi",
      "parking",
    ]; 

    return categories.reduce((acc, category) => {
      const avg = getAverage(category);
      let color = "#ccc9c2"; // 기본 색상

      if (avg >= 2 && avg < 2.66) color = "#FFD6D6"; // "별로에요" 색상
      else if (avg >= 2.66 && avg < 3.33) color = "#D9F7BE"; // "보통이에요" 색상
      else if (avg >= 3.33 && avg <= 4) color = "#D0E8FF"; // "좋아요" 색상

      return { ...acc, [category]: color };
    }, {} as Record<keyof ReviewContent, string>);
  }, [reviews]);

  return categoryColor;
};

export default useReviewColor;
