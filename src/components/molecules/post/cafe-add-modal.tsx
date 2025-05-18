import { Button } from '@atoms/elements/button';
import { Input } from '@atoms/elements/Input';
import { CafeIcon } from '@atoms/icons/cafe-icon';
import { getCurrentLocation } from '@utils/getCurrentLocation';
import { useTextSearch } from '@utils/useTextSearch';
import { useEffect } from 'react';
import { Cafe } from 'src/types/post';
interface CafeAddModalProps {
  onClose: () => void;
  cafeSetting: React.Dispatch<React.SetStateAction<Cafe>>;
}

export function CafeAddModal({ onClose, cafeSetting }: CafeAddModalProps) {
  const { searchTxt, setSearchTxt, results, performSearch, loading } =
    useTextSearch();

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchTxt.trim()) {
        const location = await getCurrentLocation();
        await performSearch(searchTxt, location);
      }
    }, 300);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTxt]);
  const handleClickCafe = (id: string, displayName: string) => {
    cafeSetting({ id, displayName });
  };

  return (
    <div className="h-dvh w-full rounded-t-xl bg-white px-6 py-4">
      <div className="" />
      <div className="text-blk flex items-center justify-between bg-white px-6 py-3 sm:text-base md:text-lg lg:text-xl">
        <CafeIcon />
        <p>카페</p>
        <Button className="cursor-pointer" onClick={onClose}>
          취소
        </Button>
      </div>
      <Input
        className="mt-4 h-10 w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
        placeholder="검색"
        value={searchTxt}
        onChange={(text) => setSearchTxt(text.target.value)}
      />
      {loading ? (
        <p>검색 중입니다...</p>
      ) : (
        <ul className="h-fit w-full py-6">
          {results.map((e, id) => (
            <li
              onClick={() => {
                handleClickCafe(e.id, e.displayName);
                onClose();
              }}
              className="cursor-pointer rounded-[10px] p-2 px-4 hover:bg-neutral-200"
              key={id}
            >
              {e.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
