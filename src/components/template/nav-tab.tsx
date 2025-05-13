import { Link, useLocation } from "react-router";
import { BookMarkIcon } from "../atoms/book-mark-icon";
import { FeedIcon } from "../atoms/feed-icon";

export default function NavTab() {
	const location = useLocation();
	const isFeedActive = location.pathname === "/profile";
	const isBookmarkActive = location.pathname.includes("/profile/bookmark");

	return (
		<nav className="flex h-10 w-full shadow-xl">
			<Link
				to="/profile"
				className={`flex w-1/2 items-center justify-center border-b-2 ${
					isFeedActive ? "border-[#232323]" : "border-[#f1f1f1]"
				}`}
			>
				<FeedIcon className="text-lg" />
			</Link>

			<Link
				to="/profile/bookmark"
				className={`flex w-1/2 items-center justify-center border-b-2 ${
					isBookmarkActive ? "border-[#232323]" : "border-[#f1f1f1]"
				}`}
			>
				<BookMarkIcon className="text-lg" />
			</Link>
		</nav>
	);
}
