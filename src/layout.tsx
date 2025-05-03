import { Outlet } from "react-router";
import NavBar from "./widget/nav-bar";

export default function Layout (){
    return (
        <div className="w-full h-dvh">
            <div className="w-full h-[calc(100%-56px)]">
                <Outlet/>
            </div>
            <NavBar/>
        </div>
    )
}