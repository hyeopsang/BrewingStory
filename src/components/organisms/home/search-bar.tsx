import { useEffect } from "react";
import { useSearch } from "../../../utils/useSearch";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/button";
import { SearchIcon } from "../../atoms/search-icon";
interface SearchFormProps {
	currentLocation: google.maps.LatLng | null;
}

export const SearchBar = ({ currentLocation }: SearchFormProps) => {
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
			className="-translate-x-1/2 absolute top-0 left-1/2 z-10 flex h-12 w-full items-center justify-between bg-white shadow-md sm:h-10 sm:px-6 md:h-12 md:px-6 lg:h-12 lg:px-8"
			id="search_form"
			onSubmit={handleSearch}
		>
			<Input
				inputType="text"
				id="keyword"
				aria-label="카페명 입력"
				className="flex-grow bg-white text-responsive-sm outline-none placeholder:font-normal placeholder:text-[#dbdbdb] placeholder:text-responsive-sm"
				value={searchTxt}
				onChange={onChangeTxt}
				placeholder="카페명으로 검색"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						const form = document.getElementById(
							"search_form",
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
