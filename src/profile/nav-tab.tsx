import { Link } from "react-router";
import BookMarkIcon from "./book-mark-icon";
import FeedIcon from "./feed-icon";

export default function NavTab () {
    return (
        <nav className="w-full h-10 border-t border-neutral-200 flex shadow-xl">
            <Link to="/profile/feed" className="w-1/2 flex justify-center items-center">
                <FeedIcon />
            </Link>
            <Link to="/profile/bookmark" className="w-1/2 flex justify-center items-center">
                <BookMarkIcon />
            </Link>
        </nav>
    )
}