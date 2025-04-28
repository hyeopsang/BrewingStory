import { Outlet } from "react-router";
import NavTab from "./nav-tab";
import ProfileInfo from "./profile-info";

export default function Profile() {
  return (
    <article className="pt-12">
      {/* 상단 고정 */}
      <p className="fixed top-0 w-full text-lg font-semibold bg-neutral-700 px-6 py-3 text-white z-20">
        @ dbtkdguq3
      </p>

      {/* 스크롤 가능한 영역 */}
      <div className="overflow-y-scroll">
        <ProfileInfo />
        
        {/* 스크롤하다가 상단에 닿으면 고정 */}
        <div className="sticky top-12 z-10 bg-white">
          <NavTab />
        </div>

        <Outlet />
      </div>
    </article>
  );
}
