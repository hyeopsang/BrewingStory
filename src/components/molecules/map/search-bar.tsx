import { Button } from '@atoms/elements/button';
import { Input } from '@atoms/elements/Input';
import { SearchIcon } from '@atoms/icons/search-icon';
import { useEffect } from 'react';

import { useSearch } from '../../../utils/useSearch';
interface SearchFormProps {
  currentLocation: google.maps.LatLng | null;
}

export const SearchBar = ({ currentLocation }: SearchFormProps) => {
  const { performSearch, setSearchTxt, searchTxt } = useSearch();

  useEffect(() => {
    if (currentLocation) {
      setSearchTxt(''); // 위치 변경 시 검색어 초기화
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTxt.trim() || !currentLocation) return;
    await performSearch(searchTxt, currentLocation);
  };

  const onChangeTxt = (text: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(text.target.value);
  };

  return (
    <form
      className="absolute top-0 left-1/2 z-10 flex h-12 w-full -translate-x-1/2 items-center justify-between bg-white shadow-md sm:h-10 sm:px-6 md:h-12 md:px-6 lg:h-12 lg:px-8"
      id="search_form"
      onSubmit={handleSearch}
    >
      <Input
        inputType="search"
        id="keyword"
        aria-label="카페명 입력"
        className="text-responsive-sm placeholder:text-responsive-sm flex-grow bg-white outline-none placeholder:font-normal placeholder:text-[#dbdbdb]"
        value={searchTxt}
        onChange={onChangeTxt}
        placeholder="카페명으로 검색"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const form = document.getElementById(
              'search_form'
            ) as HTMLFormElement;
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
