import { SquarePlay } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Link } from "react-router";
import UserSearchIcon from "./user-search-icon";
import AddIcon from "./add-icon";
import HomeIcon from "./home-icon";
import MediaIcon from "./media-icon";
import ProfileIcon from "./profile-icon";
import { useLocation } from "react-router";

export default function NavBar () {
    const location = useLocation();
    
    return (
        <footer className="fixed bottom-0 py-0.5 left-0 w-full bg-white text-[#232323]/40 z-[1000] shadow-2xl">
  <nav className="w-[90%] mx-auto">
    <ul className="w-full py-2 flex justify-around items-center relative">
      
      <li className={`w-1/5 flex justify-center items-center ${location.pathname === "/" ? "text-[#232323]" : ""}`}>
        <Link to="/"><HomeIcon /></Link>
      </li>

      <li className={`w-1/5 flex justify-center items-center ${location.pathname === "/feed" ? "text-[#232323]" : ""}`}>
        <Link to="/feed"><MediaIcon /></Link>
      </li>

      {/* 가운데 버튼 */}
      <li className="absolute left-1/2 -translate-x-1/2">
        <div className="p-2 aspect-square bg-white text-[#232323] rounded-full shadow-xl shadow-neutral-300 flex items-center justify-center">
          <AddIcon />
        </div>
      </li>
        <li className="w-1/5"></li>
      <li className={`w-1/5 flex justify-center items-center ${location.pathname === "/user-search" ? "text-[#232323]" : ""}`}>
        <Link to="/user-search"><UserSearchIcon /></Link>
      </li>

      <li className={`w-1/5 flex justify-center items-center ${["/profile", "/profile/bookmark"].includes(location.pathname) ? "text-[#232323]" : ""}`}>
        <Link to="/profile"><ProfileIcon /></Link>
      </li>

    </ul>
  </nav>
</footer>

    )
}