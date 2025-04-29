import { Outlet } from "react-router";
import NavTab from "./nav-tab";
import ProfileInfo from "./profile-info";
import Post from "../shared/post";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../app/redux/authSlice";
interface User {
  [key: string]: any;
}
interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}
interface MenuProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

interface AuthState {
  user: User | null;
}

export default function Profile() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user?.properties || null;
  const dispatch = useDispatch();
  console.log(auth.user)
  const handleLogout = () => {
      dispatch(logout());
      window.location.href = "/";
    };
    const profileImageUrl = userInfo?.profile_image
      ? userInfo.profile_image.replace("http://", "https://")
      : "/images/profile.svg";
    console.log("userInfo", userInfo);
  return (
    <div className="pt-12">
      {/* 상단 고정 */}
      <header className="fixed top-0 left-0 w-screen text-lg font-semibold bg-neutral-700 px-6 py-3 text-white z-20 h-[52px]">
        <p className="min-w-mobile max-w-mobile mx-auto">@ {userInfo.nickname}</p>
      </header>

      {/* 스크롤 가능한 영역 */}
      <article>
        <ProfileInfo profileImageUrl={profileImageUrl}/>

        {/* 스크롤하다가 header 아래에 닿으면 고정 */}
        <div className="sticky z-10 bg-white" style={{ top: "52px" }}>
          <NavTab />
        </div>
        <Outlet />
      </article>
    </div>
  );
}
