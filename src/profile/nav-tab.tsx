import { Link, useLocation } from "react-router";
import BookMarkIcon from "./book-mark-icon";
import FeedIcon from "./feed-icon";

export default function NavTab () {
    const location = useLocation();
    const isFeedActive = location.pathname === "/profile";
    const isBookmarkActive = location.pathname.includes("/profile/bookmark");


    return (
        <nav className="w-full h-10 flex shadow-xl">
            <Link
                to="/profile"
                className={`w-1/2 flex justify-center items-center border-b-2 ${
                isFeedActive ? "border-[#232323]" : "border-[#f1f1f1]"
                }`}
            >
                <FeedIcon />
            </Link>

            <Link
                to="/profile/bookmark"
                className={`w-1/2 flex justify-center items-center border-b-2 ${
                isBookmarkActive ? "border-[#232323]" : "border-[#f1f1f1]"
                }`}
            >
                <BookMarkIcon />
            </Link>
        </nav>
    )
}