import { Outlet } from "react-router";
import NavTab from "../template/nav-tab";
import ProfileInfo from "../molecules/profile-info";
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
      : "";
    console.log("userInfo", userInfo);
  return (
    <div>
      <article>
        <ProfileInfo profileImageUrl={profileImageUrl}/>
        <div className="sticky z-10 bg-white">
          <NavTab />
        </div>
        <Outlet />
      </article>
    </div>
  );
}
