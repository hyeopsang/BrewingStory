import { useEffect } from "react";
import { useSearch } from "../utils/useSearch";
import { Button } from "../atoms/button";
import { Input } from "../atoms/Input";
import { SearchIcon } from "../atoms/search-icon";
interface SearchFormProps {
  currentLocation: google.maps.LatLng | null;
}

export const SearchBar = ({currentLocation}: SearchFormProps) => {
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
      className="absolute left-1/2 top-0 z-10 flex w-full h-12 lg:h-12 md:h-12 sm:h-10 lg:px-8 md:px-6 sm:px-6 -translate-x-1/2 items-center justify-between bg-white shadow-md"
      id="search_form"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        id="keyword"
        aria-label="카페명 입력"
        className="flex-grow text-responsive-sm bg-white outline-none placeholder:text-responsive-sm placeholder:font-normal placeholder:text-[#dbdbdb]"
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
      <Button type="submit" disabled={!searchTxt.trim()} aria-label="검색 실행">
        <SearchIcon className="text-responsive-lg" />
      </Button>
    </form>
  );
};

