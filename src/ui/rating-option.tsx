import { Frown, Meh, Smile } from "lucide-react";

export function RatingOption({
  category,
  label,
  value,
  onChange,
  ratingValues,
}: {
  category: string;
  label: string;
  value: number;
  onChange: (category: string, value: number) => void;
  ratingValues: { bad: number; soso: number; good: number };
}) {
  
  const options = [
    { label: "별로에요", value: ratingValues.bad, image: <Frown className="w-[40px] h-[40px]"/>, bg: "#FFD6D6", color: "#FF3B3B"},
    { label: "보통이에요", value: ratingValues.soso, image: <Meh className="w-[40px] h-[40px]"/>, bg: "#D9F7BE", color: "#00A650" },
    { label: "좋아요", value: ratingValues.good, image: <Smile className="w-[40px] h-[40px]"/>, bg: "#D0E8FF", color: "#007BFF" },
  ];

  return (
    <div>
      <h2>{label}</h2>
      <div className="grid grid-cols-3 pt-4">
        {options.map(({ label, value: optionValue, image, bg, color }) => (
          <div key={optionValue} className="flex flex-col items-center gap-[5px]">
            <div
              className="aspect-square w-[40px] flex justify-center items-center overflow-hidden rounded-[50px] cursor-pointer"
              onClick={() => {
                console.log(`선택됨: ${label}, 현재 값: ${value}, 선택한 값: ${optionValue}`);
                onChange(category, optionValue);
              }}
              style={{
                backgroundColor: value === optionValue ? bg : "transparent",
                color: value === optionValue ? color : "#a1a1a1",
              }}
            >
              {image}
            </div>

            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
