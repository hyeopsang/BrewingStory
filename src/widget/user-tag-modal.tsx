import { UserTagIcon } from "./user-tag-icon";
import { useState, useEffect, useCallback } from "react";
import { getUser } from "../api/user";

interface UserTagModalProps {
    onClose: () => void;
}

export function UserTagModal({ onClose }: UserTagModalProps) {
    const [searchTxt, setSearchTxt] = useState<string>("")
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const handleSearch = useCallback(async (query: string) => {
        setLoading(true);
        try {
            const result = await getUser(query);
            setResults(result ? [result] : []);
        } catch (err) {
            console.error("검색 오류:", err);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTxt.trim()) {
                handleSearch(searchTxt);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [searchTxt, handleSearch]);
    

    return (
        <div className="w-full h-dvh rounded-t-xl px-6 py-4 bg-white">
            <div className=""></div>
            <div className="flex items-center justify-between px-6 py-3 text-xl text-[#232323] bg-white">
                <UserTagIcon />
                <p>유저</p>
                <button className="cursor-pointer" onClick={onClose}>취소</button>
            </div>
            <form onSubmit={(e) => {e.preventDefault();  handleSearch(searchTxt);}}>
                <input
                    className="w-full h-10 px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="검색"
                    value={searchTxt}
                    onChange={(e) => setSearchTxt(e.target.value)}
                />
            </form>
            {loading ? (
                <p>검색 중입니다...</p>
                ) : results.length === 0 && searchTxt.trim() ? (
                <p>검색 결과가 없습니다.</p>
                ) : (
                <ul className="w-full py-6 h-fit">
                    {results.map((e, id) => (
                    <li className="p-2 px-4 cursor-pointer rounded-[10px] hover:bg-neutral-200" key={id}>{e.displayName}</li>
                    ))}
                </ul>
                )}
        </div>
    )
}
