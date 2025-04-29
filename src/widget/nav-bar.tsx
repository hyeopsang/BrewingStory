import { SquarePlay } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Link } from "react-router";
import UserSearchIcon from "./user-search-icon";
export default function NavBar () {
    return (
        <footer className="w-full h-auto fixed bottom-0 left-0 bg-white z-50 shadow-2xl">
            <nav className="w-[90%] mx-auto">
                <ul className="w-full py-4 flex justify-center items-center">
                    <li className="w-1/4 flex justify-center items-center">
                        <Link to="/">
                            <img src="/images/home.svg" alt="네비게이션 바 - 메인 홈"/>
                        </Link>
                    </li>
                    <li className="w-1/4 flex justify-center items-center">
                        <Link to="/feed">
                            <img src="/images/feed.svg" alt="네비게이션 바 - 피드" />
                        </Link>
                    </li>
                    <li className="w-1/4 flex justify-center items-center">
                        <Link to="/user-search">
                            <UserSearchIcon />
                        </Link>
                    </li>
                    <li className="w-1/4 flex justify-center items-center">
                        <Link to="/profile">
                            <img src="/images/profile.svg" alt="네비게이션 바 - 프로필"/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}