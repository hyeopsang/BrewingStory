import { Button } from '@atoms/elements/button';
import { Input } from '@atoms/elements/Input';
import { UserTagIcon } from '@atoms/icons/user-tag-icon';
import { useCallback, useEffect, useState } from 'react';
import { UserInfo } from 'src/types/user';

import { getUser } from '../../../api/user';
interface UserTagModalProps {
  onClose: () => void;
  tag: React.Dispatch<React.SetStateAction<UserInfo[]>>;
}

export function UserTagModal({ onClose, tag }: UserTagModalProps) {
  const [searchTxt, setSearchTxt] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UserInfo[]>([]);
  const [tagList, setTagList] = useState<UserInfo[]>([]);
  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const result = await getUser(query);
      setResults(result ? [result] : []);
    } catch (err) {
      console.error('검색 오류:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  const tagComplete = () => {
    if (tagList && tagList.length === 0) {
      onClose();
    }
    if (tagList && tagList.length > 0) {
      tag(tagList);
      onClose();
    }
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTxt.trim()) {
        handleSearch(searchTxt);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTxt, handleSearch]);

  return (
    <div className="h-dvh w-full rounded-t-xl bg-white px-6 py-4">
      <div className="" />
      <div className="text-blk flex items-center justify-between bg-white px-6 py-3 sm:text-base md:text-lg lg:text-xl">
        <UserTagIcon />
        <p>사람</p>
        <Button className="cursor-pointer" onClick={tagComplete}>
          완료
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
      ) : results.length === 0 && searchTxt.trim() ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul className="h-fit w-full py-6">
          {results.map((e, id) => (
            <li
              onClick={() => {
                if (!tagList.some((u) => u.nickname === e.nickname)) {
                  setTagList((prev) => [...prev, e]);
                }
              }}
              className="cursor-pointer rounded-[10px] p-2 px-4 hover:bg-neutral-200"
              key={id}
            >
              {e.nickname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
