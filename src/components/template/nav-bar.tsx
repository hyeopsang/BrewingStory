import { useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { AddIcon } from "../atoms/add-icon";
import { Button } from "../atoms/button";
import { HomeIcon } from "../atoms/home-icon";
import { MediaIcon } from "../atoms/media-icon";
import { ProfileIcon } from "../atoms/profile-icon";
import { SelectTemplate } from "../molecules/select-template";
import Modal from "./modal";

export default function NavBar() {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<footer className="fixed left-0 z-50 h-13 w-full bg-white text-[#232323]/40 shadow-2xl">
			<nav className="mx-auto flex h-full w-full max-w-mobile items-center justify-center">
				<ul className="flex w-full items-center justify-around">
					<li
						className={`flex w-1/5 items-center justify-center text-responsive ${location.pathname === "/" ? "text-[#232323]" : "hover:text-[#232323]"}`}
					>
						<Link to="/">
							<HomeIcon className="text-xl" />
						</Link>
					</li>
					<li
						className={`flex w-1/5 items-center justify-center text-[1.2rem] text-responsive ${location.pathname === "/feed" ? "text-[#232323]" : "hover:text-[#232323]"}`}
					>
						<Link to="/feed">
							<MediaIcon className="text-xl" />
						</Link>
					</li>
					<li className="flex w-1/5 items-center justify-center text-[1.2rem] text-responsive">
						<Button onClick={() => setIsOpen(true)}>
							<AddIcon className="text-xl" />
						</Button>
					</li>
					<li
						className={`flex w-1/5 items-center justify-center text-responsive ${["/profile", "/profile/bookmark"].includes(location.pathname) ? "text-[#232323]" : "hover:text-[#232323]"}`}
					>
						<Link to="/profile">
							<ProfileIcon className="text-xl" />
						</Link>
					</li>
				</ul>
			</nav>
			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<SelectTemplate />
				</Modal>
			)}
		</footer>
	);
}
