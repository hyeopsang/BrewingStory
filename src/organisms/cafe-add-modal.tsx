import { CafeIcon } from "../atoms/cafe-icon";
import { useCallback, useEffect, useState } from "react";
import { useTextSearch } from "../utils/useTextSearch";
import { getCurrentLocation } from "../utils/getCurrentLocation";
import { Text } from "../atoms/Text";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
interface Cafe {
  id: string;
  displayName: string;
}
interface CafeAddModalProps {
    onClose: () => void;
    cafeSetting: React.Dispatch<React.SetStateAction<Cafe>>;
}


export function CafeAddModal({ onClose, cafeSetting } : CafeAddModalProps) {
    const { searchTxt, setSearchTxt, results, performSearch, loading } = useTextSearch();
   
    useEffect(() => {
        const delay = setTimeout(async () => {
        if (searchTxt.trim()) {
            const location = await getCurrentLocation();
            await performSearch(searchTxt, location);
        }
        }, 300);
    
        return () => clearTimeout(delay);
    }, [searchTxt]);
    const handleClickCafe = (id: string, displayName: string) => {
      cafeSetting({ id, displayName }); // Cafe 객체로 만들어서 전달
    };
    
        
  return (
    <div className="w-full h-dvh rounded-t-xl px-6 py-4 bg-white">
      <div className=""></div>
      <div className="flex items-center justify-between px-6 py-3 sm:text-base md:text-lg lg:text-xl text-[#232323] bg-white">
        <CafeIcon />
        <Text>카페</Text>
        <Button className="cursor-pointer" onClick={onClose}>취소</Button>
      </div>
        <Input
          className="w-full h-10 px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="검색"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
      {loading ? (
        <p>검색 중입니다...</p>
        ) : (
        <ul className="w-full py-6 h-fit">
            {results.map((e, id) => (
            <li onClick={() => {handleClickCafe(e.id, e.displayName); onClose();}} className="p-2 px-4 cursor-pointer rounded-[10px] hover:bg-neutral-200" key={id}>{e.displayName}</li>
            ))}
        </ul>
        )}

    </div>
  );
}
