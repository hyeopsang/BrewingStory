import { CafeIcon } from "./cafe-icon";
import { useCallback, useEffect, useState } from "react";
import { useTextSearch } from "./useTextSearch";
import { getCurrentLocation } from "../map/utils/getCurrentLocation";

interface CafeAddModalProps {
    onClose: () => void;
}


export function CafeAddModal({ onClose } : CafeAddModalProps) {
    const { searchTxt, setSearchTxt, results, performSearch, loading } = useTextSearch();
    const handleSearch = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const location = await getCurrentLocation();
        const result = await performSearch(searchTxt, location);
        console.log(result);
    },[]);
    useEffect(() => {
        const delay = setTimeout(async () => {
        if (searchTxt.trim()) {
            const location = await getCurrentLocation();
            await performSearch(searchTxt, location);
        }
        }, 300);
    
        return () => clearTimeout(delay);
    }, [searchTxt]);
    {!loading && results.length === 0 && searchTxt.trim() && (
        <p>검색 결과가 없습니다.</p>
      )}      
  return (
    <div className="w-full h-dvh rounded-t-xl px-6 py-4 bg-white">
      <div className=""></div>
      <div className="flex items-center justify-between px-6 py-3 text-xl text-[#232323] bg-white">
        <CafeIcon />
        <p>카페</p>
        <button className="cursor-pointer" onClick={onClose}>취소</button>
      </div>
      <form onSubmit={handleSearch}>
        <input
          className="w-full h-10 px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="검색"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
      </form>

      {loading ? (
        <p>검색 중입니다...</p>
        ) : (
        <ul className="w-full py-6 h-fit">
            {results.map((e, id) => (
            <li className="p-2 px-4 cursor-pointer rounded-[10px] hover:bg-neutral-200" key={id}>{e.displayName}</li>
            ))}
        </ul>
        )}

    </div>
  );
}
