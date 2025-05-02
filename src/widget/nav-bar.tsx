import { SquarePlay } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Link } from "react-router";
import FeedIcon from "./feed-icon";
import AddIcon from "./add-icon";
import HomeIcon from "./home-icon";
import MediaIcon from "./media-icon";
import ProfileIcon from "./profile-icon";
import { useLocation } from "react-router";
import { useState } from "react";
import { SelectTemplate } from "./select-template";

export default function NavBar () {
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);
    return (
        <footer className="w-full h-16 relative bg-white text-[#232323]/40 z-100 shadow-2xl">
        <nav className="w-full mx-auto flex justify-center items-center h-full">
          <ul className="w-full flex justify-around items-center relative">
            
            <li className={`w-1/5 flex justify-center items-center ${location.pathname === "/" ? "text-[#232323]" : ""}`}>
              <Link to="/"><HomeIcon /></Link>
            </li>
            <li className={`w-1/5 flex justify-center items-center ${location.pathname === "/feed" ? "text-[#232323]" : ""}`}>
              <Link to="/feed"><FeedIcon /></Link>
            </li>
            <li className="w-1/5 flex justify-center items-center">
              <button onClick={() => setOpenModal(true)} >
                <AddIcon />
              </button>
            </li>
            

            <li className={`w-1/5 flex justify-center items-center ${["/profile", "/profile/bookmark"].includes(location.pathname) ? "text-[#232323]" : ""}`}>
              <Link to="/profile"><ProfileIcon /></Link>
            </li>

          </ul>
        </nav>
  {openModal && (<SelectTemplate/>)}
</footer>

    )
}
