import { Outlet } from "react-router";
import NavBar from "./template/nav-bar";

export default function Layout (){
    return (
        <div className="w-full h-dvh">
            <div className="w-full h-[calc(100%-52px)]">
                <Outlet/>
            </div>
            <NavBar/>
        </div>
    )
}
