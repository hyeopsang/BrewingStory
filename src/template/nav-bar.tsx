import { Link } from "react-router";
import { AddIcon } from "../atoms/add-icon";
import { HomeIcon } from "../atoms/home-icon";
import { ProfileIcon } from "../atoms/profile-icon";
import { useLocation } from "react-router";
import { useState } from "react";
import { SelectTemplate } from "../molecules/select-template";
import Modal from "./modal";
import { Button } from "../atoms/button";
import { MediaIcon } from "../atoms/media-icon";

export default function NavBar () {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <footer className="w-full left-0 h-13 bg-white text-[#232323]/40 z-50 shadow-2xl fixed">
        <nav className="w-full max-w-mobile mx-auto flex justify-center items-center h-full">
          <ul className="w-full flex justify-around items-center">
            
            <li className={`w-1/5 flex justify-center text-responsive items-center ${location.pathname === "/" ? "text-[#232323]" : "hover:text-[#232323]"}`}>
              <Link to="/"><HomeIcon className="text-responsive"/></Link>
            </li>
            <li className={`w-1/5 flex text-responsive justify-center items-center text-[1.2rem] ${location.pathname === "/feed" ? "text-[#232323]" : "hover:text-[#232323]"}`}>
              <Link to="/feed"><MediaIcon className="text-responsive" /></Link>
            </li>
            <li className="w-1/5 flex text-responsive justify-center items-center text-[1.2rem]">
              <Button onClick={() => setIsOpen(true)}>
                <AddIcon className="text-responsive" />
              </Button>
            </li>
            <li className={`w-1/5 text-responsive flex justify-center items-center ${["/profile", "/profile/bookmark"].includes(location.pathname) ? "text-[#232323]" : "hover:text-[#232323]"}`}>
              <Link to="/profile"><ProfileIcon className="text-responsive" /></Link>
            </li>

          </ul>
        </nav>
        {isOpen && (<Modal onClose={() => setIsOpen(false)}><SelectTemplate/></Modal>)}
</footer>

    )
}
