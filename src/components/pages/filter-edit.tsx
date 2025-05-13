import { Link } from "react-router";
import { Button } from "../atoms/button";
import { LeftIcon } from "../atoms/left-icon";
import FilterKeywords from "../organisms/filter-keywords";

export default function FilterEdit() {
	return (
		<section className="flex h-full w-full flex-col gap-6 bg-white px-[5%] pb-3 text-center">
			<Link to="/profile" className="mb-auto py-3">
				<LeftIcon />
			</Link>
			<h2 className="text-responsive-lg">어떤 카페를 찾고 계신가요?</h2>
			<p className="text-responsive-sm">
				개인의 취향에 맞춘 필터 기능으로
				<br /> 나에게 딱 맞는 카페를 손쉽게 찾아보세요.
			</p>
			<FilterKeywords />
			<Button
				className="mt-auto mb-4 justify-center rounded-xl bg-blue-600 text-responsive text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:py-2 lg:py-3"
				size="full"
			>
				완료
			</Button>
		</section>
	);
}
