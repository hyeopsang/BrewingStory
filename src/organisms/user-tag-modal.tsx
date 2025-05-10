import { UserTagIcon } from "../atoms/user-tag-icon";
import { useState, useEffect, useCallback } from "react";
import { getUser } from "../api/user";
import { Text } from "../atoms/Text";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/button";
interface UserInfo {
    nickname: string;
    bio: string;
    updatedAt: Date;
  }
interface UserTagModalProps {
    onClose: () => void;
    tag: React.Dispatch<React.SetStateAction<UserInfo[]>>
}

export function UserTagModal({ onClose, tag }: UserTagModalProps) {
    const [searchTxt, setSearchTxt] = useState<string>("")
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<UserInfo[]>([]);
    const [tagList, setTagList] = useState<UserInfo[]>([])
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
    const tagComplete = () => {
        if(tagList && tagList.length == 0){
            onClose();
        }
        if(tagList && tagList.length > 0){
            tag(tagList);
            onClose();
        }
        
    }
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
            <div className="flex items-center justify-between px-6 py-3 sm:text-base md:text-lg lg:text-xl text-[#232323] bg-white">
                <UserTagIcon />
                <Text>사람</Text>
                <Button className="cursor-pointer" onClick={tagComplete}>완료</Button>
            </div>
                <Input
                    className="w-full h-10 px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="검색"
                    value={searchTxt}
                    onChange={(e) => setSearchTxt(e.target.value)}
                />
            {loading ? (
                <Text>검색 중입니다...</Text>
                ) : results.length === 0 && searchTxt.trim() ? (
                <Text>검색 결과가 없습니다.</Text>
                ) : (
                <ul className="w-full py-6 h-fit">
                    {results.map((e, id) => (
                    <li onClick={() => {
                        if (!tagList.some((u) => u.nickname === e.nickname)) {
                          setTagList((prev) => [...prev, e]);
                        }
                      }} className="p-2 px-4 cursor-pointer rounded-[10px] hover:bg-neutral-200" key={id}>{e.nickname}</li>
                    ))}
                </ul>
                )}
        </div>
    )
}
