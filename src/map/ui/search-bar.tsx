import { useEffect } from "react";
import { useSearch } from "../utils/useSearch";
import { Search, AlignJustify, X } from "lucide-react";

interface SearchFormProps {
  currentLocation: google.maps.LatLng | null;
}

const SearchForm = ({currentLocation}: SearchFormProps) => {
  const { performSearch, setSearchTxt, searchTxt } = useSearch();

  useEffect(() => {
    if (currentLocation) {
      setSearchTxt(""); // 위치 변경 시 검색어 초기화
    }
  }, [currentLocation]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTxt.trim() || !currentLocation) return;
    await performSearch(searchTxt, currentLocation);
  };

  const onChangeTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(e.target.value);
  };

  const handleCancel = () => {
    setSearchTxt("");
  };

  return (
    <form
      className="absolute left-1/2 top-0 z-10 flex w-full h-12 px-8 -translate-x-1/2 items-center justify-between bg-white shadow-md"
      id="search_form"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        id="keyword"
        aria-label="카페명 입력"
        className="flex-grow text-base bg-white outline-none placeholder:text-base placeholder:font-normal placeholder:text-[#dbdbdb]"
        value={searchTxt}
        onChange={onChangeTxt}
        placeholder="카페명으로 검색"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const form = document.getElementById("search_form") as HTMLFormElement;
            form?.requestSubmit();
          }
        }}
      />
      <button type="submit" disabled={!searchTxt.trim()} aria-label="검색 실행">
        <Search className="w-5.5" />
      </button>
    </form>
  );
};

export default SearchForm;
