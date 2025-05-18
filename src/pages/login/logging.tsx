import { LoadingIcon } from '@atoms/icons/loading-icon';
import { handleUserLogin } from '@utils/handleUserLogin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export function Logging() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');

  const getToken = async () => {
    try {
      const response = await axios.post(
        'https://us-central1-cafecommunity-8266e.cloudfunctions.net/api/kakao-login',
        {
          code,
          redirectUri: import.meta.env.VITE_REDIRECT_URI,
        },
        { withCredentials: true }
      );

      const { access_token, kakaoUser } = response.data.data;
      setAccessToken(access_token);

      await handleUserLogin(kakaoUser, access_token, dispatch, navigate);
    } catch (err) {
      console.error('Login Error:', err);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      const uid = localStorage.getItem('uid');

      if (!refresh_token || !uid) {
        throw new Error('Refresh token or UID is missing');
      }

      const response = await axios.post(
        'https://us-central1-cafecommunity-8266e.cloudfunctions.net/api/refresh-token',
        {
          refresh_token,
          uid,
        }
      );

      const { access_token, refresh_token: newRefreshToken } =
        response.data.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', newRefreshToken || refresh_token);

      return access_token;
    } catch (err) {
      console.error('Refresh Token Error:', err);
    }
  };

  useEffect(() => {
    if (code) {
      getToken();
    } else {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        refreshAccessToken();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div
      className="flex h-svh max-w-[428px] min-w-[375px] flex-col items-center justify-center"
      role="status"
    >
      <LoadingIcon />
      <p className="text-center text-[24px] text-white">
        카카오 아이디로 로그인 중...
      </p>
    </div>
  );
}
