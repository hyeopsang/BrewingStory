import { useNavigate } from "react-router";
import { useEffect } from "react";
import { loginSuccess } from "../app/redux/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
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
    try {
      // 서버로 code와 redirectUri를 보내서 토큰을 받아옴
      const response = await axios.post("https://your-server-url/kakao-login", {
        code: code,
        redirectUri: import.meta.env.VITE_REDIRECT_URI, // 서버의 리디렉션 URI
      });

      const { access_token, refresh_token, kakaoUser } = response.data.data;

      // 로그인 성공 후 Redux 상태 업데이트
      dispatch(loginSuccess({ id: kakaoUser.id, ...kakaoUser }));

      // 토큰과 유저 정보로 로컬 스토리지 등에 저장해두기
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // 페이지 이동
      navigate("/");

    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      
      if (!refresh_token) {
        throw new Error("Refresh token is missing");
      }

      const response = await axios.post("https://your-server-url/refresh-token", {
        refresh_token,
        uid: "user-id", // 적절한 유저 ID를 넣어야 합니다.
      });

      const { access_token, refresh_token: newRefreshToken } = response.data.data;

      // 새로운 토큰 저장
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", newRefreshToken || refresh_token); // 새 리프레시 토큰 저장

      return access_token; // 갱신된 액세스 토큰 반환

    } catch (err) {
      console.error("Refresh Token Error:", err);
    }
  };

  useEffect(() => {
    if (code) {
      getToken(); // 로그인 처리
    } else {
      // 액세스 토큰 만료 시 새로 갱신
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        refreshAccessToken(); // 액세스 토큰이 없으면 리프레시 토큰으로 갱신
      }
    }
  }, [code]);

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
