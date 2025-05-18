import { useState } from 'react';
export function FilterKeywords() {
  const [selectedKeyword, setSelectedKeyword] = useState([]);
  console.log(selectedKeyword);
  const keywords = {
    '인테리어가 이쁜 곳': [],
    '친절한 곳': [],
    '좌석이 편안한 곳': [],
    '야외, 테라스, 루프탑': [],
    '커피 찐 맛집': [],
    '작업하기 좋은 곳': [],
    '대화하기 좋은 곳': [],
    '음악이 좋은 곳': [],
    '분위기가 차분한 곳': [],
    '가성비 좋은 곳': [],
    '디저트 맛집': [],
    '음료 맛집': [],
    '뷰가 예쁜 곳': [],
    '청결한 곳': [],
    '사진이 잘 나오는 곳': [],
  };
  const handleClickKeyword = (keyword: string) => {
    const isSelected = selectedKeyword.includes(keyword);
    if (!isSelected) {
      setSelectedKeyword((prev) => [...prev, keyword]);
    } else if (isSelected) {
      const removeKeyword = selectedKeyword.filter((e) => e !== keyword);
      setSelectedKeyword(removeKeyword);
    }
  };
  return (
    <ul className="mx-auto flex w-[90%] flex-wrap items-center justify-center gap-3 py-1">
      {Object.keys(keywords).map((key, index) => {
        const select = selectedKeyword.includes(key);
        return (
          <li
            className={
              select
                ? 'text-responsive-xs text-bbl bg-bbl/10 w-fit cursor-pointer rounded-full px-2.5 py-1'
                : 'text-responsive-xs text-blk bg-blk/10 w-fit cursor-pointer rounded-full px-2.5 py-1'
            }
            key={index}
            onClick={() => handleClickKeyword(key)}
          >
            {key}
          </li>
        );
      })}
    </ul>
  );
}
