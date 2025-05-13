import { useCallback, useEffect, useState } from "react";
import { getUser } from "../../api/user";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/button";
import { UserTagIcon } from "../atoms/user-tag-icon";
interface UserInfo {
	nickname: string;
	bio: string;
	updatedAt: Date;
}
interface UserTagModalProps {
	onClose: () => void;
	tag: React.Dispatch<React.SetStateAction<UserInfo[]>>;
}

export function UserTagModal({ onClose, tag }: UserTagModalProps) {
	const [searchTxt, setSearchTxt] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<UserInfo[]>([]);
	const [tagList, setTagList] = useState<UserInfo[]>([]);
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
			<div className="flex items-center justify-between bg-white px-6 py-3 text-[#232323] sm:text-base md:text-lg lg:text-xl">
				<UserTagIcon />
				<p>사람</p>
				<Button className="cursor-pointer" onClick={tagComplete}>
					완료
				</Button>
			</div>
			<Input
				className="mt-4 h-10 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
				placeholder="검색"
				value={searchTxt}
				onChange={(e) => setSearchTxt(e.target.value)}
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
