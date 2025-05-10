import { useNavigate } from "react-router";
import { useEffect } from "react";
import { loginSuccess } from "../app/redux/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { LoadingIcon } from "../atoms/loading-icon";

export default function Logging() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      code: code,
      client_secret: import.meta.env.VITE_KAKAO_SECRET_KEY,
    });

    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload,
        {
          headers: {
            "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
          }
        }
      );

      window.Kakao.init("d884e8e42aa47c7c8ee303055281e7cc")
      window.Kakao.Auth.setAccessToken(res.data.access_token); 
      const userInfo = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      dispatch(loginSuccess({ id: userInfo.id, ...userInfo }));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div
      className="flex h-svh min-w-[375px] max-w-[428px] flex-col items-center justify-center"
      role="status"
    >
      <LoadingIcon />
      <p className="text-center text-[24px] text-white">카카오 아이디로 로그인 중...</p>
    </div>
  );
}
