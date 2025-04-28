import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/redux/authSlice";
import { motion } from "framer-motion";
import { X, Pencil, LogIn, LogOut, MapPin, Bookmark } from 'lucide-react';
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

export default function Menu({ setIsOpen, isOpen }: MenuProps) {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user?.properties || null;
  const dispatch = useDispatch();
  console.log("userInfo", userInfo);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  const profileImageUrl = userInfo?.profile_image
    ? userInfo.profile_image.replace("http://", "https://")
    : "/images/profile.svg";

  return (
    <motion.div
      initial={{ transform: "translateX(-100%)" }}
      animate={{ transform: isOpen ? "translateX(0%)" : "translateX(-100%)" }}
      exit={{ transform: "translateX(100%)", opacity: 0 }}
      transition={{ type: "keyframes", stiffness: 120 }}
      className="absolute top-0 left-0 z-50 w-full h-svh bg-white p-4 shadow-lg"
    >
      <div className="w-fit aspect-square flex items-center p-2 text-white rounded-full bg-buttonRed ml-auto">
        <X className="w-[30px] cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center ">
        { userInfo && (
          <div className="flex w-[150px] flex-col items-center gap-[15px] relative">
            <MapPin size={225} className="text-buttonRed" fill="#FF6B6B" />
            <div className="absolute top-7 aspect-square w-[130px] overflow-hidden rounded-full bg-white">
              <img src={profileImageUrl} alt="Profile" />
            </div>
          </div>
        )}
        
        <div className="flex flex-col items-center gap-[15px] pt-[15px] text-lg">
          {
            userInfo && 
            <>
                <Link to={"/my-review"}>
                  <div className="flex justify-between items-center bg-[#D0E8FF] p-2 px-[20px] w-[150px] rounded-full text-[#007BFF]">
                    <Pencil size={20}/>
                    <p>나의 리뷰</p>
                  </div>
                </Link>
                <Link to={"/book-mark"}>
                  <div className="flex justify-between items-center bg-[#D9F7BE] p-2 px-[20px] w-[150px] rounded-full text-[#00A650]">
                    <Bookmark size={20}/>
                    <p>북마크</p>
                  </div>
                </Link>
            </>
          }
          
          {
            userInfo ? (
              <a onClick={handleLogout}>
                <div className="flex justify-between items-center gap-3 bg-[#F0F0F0] p-2 px-[20px] w-[150px] rounded-full text-neutral-900">
                  <LogOut size={20}/>
                  <p>로그아웃</p>
                </div>      
              </a>
              
            )
            : (
              <Link to={"/login"}>
                <div className="flex justify-between items-center gap-3 bg-[#F0F0F0] p-2 px-[20px] w-[150px] rounded-full text-neutral-900">
                  <LogIn size={20}/>
                  <p>로그인</p>
                </div>
              </Link>
            )
          }
          
        </div>
      </div>
    </motion.div>
  );
}

