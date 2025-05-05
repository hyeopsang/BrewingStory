import { CafeIcon } from "./cafe-icon";
import { useEffect, useState } from "react";
import { useTextSearch } from "./useTextSearch";
import { getCurrentLocation } from "../map/utils/getCurrentLocation";

export function CafeAddModal() {
    const { searchTxt, setSearchTxt, results, performSearch, loading } = useTextSearch();
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const location = await getCurrentLocation();
        const result = await performSearch(searchTxt, location);
    };
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
    <div>
      <div className=""></div>
      <div>
        <CafeIcon />
        <p>카페</p>
        <button>취소</button>
      </div>

      {/* 검색 폼 */}
      <form onSubmit={handleSearch}>
        <input
          placeholder="검색"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      {loading ? (
        <p>검색 중입니다...</p>
        ) : (
        <ul>
            {results.map((e, id) => (
            <li key={id}>{e.displayName}</li>
            ))}
        </ul>
        )}

    </div>
  );
}
