import axios from 'axios';
import admin from '../config/firebase';
import * as functions from 'firebase-functions';

const KAKAO_CLIENT_ID = functions.config().kakao.client_id;
const KAKAO_CLIENT_SECRET = functions.config().kakao.client_secret;

// 1. 인가 코드로 토큰 발급
export const getTokenFromKakaoCode = async (code: string, redirectUri: string) => {
  const response = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID,
      client_secret: KAKAO_CLIENT_SECRET,
      redirect_uri: redirectUri,
      code,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return response.data; // access_token, refresh_token, etc.
};

// 2. 액세스 토큰으로 유저 정보 요청
export const getKakaoUserInfo = async (accessToken: string) => {
  const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// 3. 리프레시 토큰으로 액세스 토큰 갱신
export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: KAKAO_CLIENT_ID,
      client_secret: KAKAO_CLIENT_SECRET,
      refresh_token: refreshToken,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return response.data; // access_token, (optional) refresh_token
};

// 4. 리프레시 토큰 저장 (만료시간 포함)
export const saveRefreshToken = async (uid: string, refreshToken: string) => {
  await admin.firestore().collection('kakaoSessions').doc(uid).set({
    refresh_token: refreshToken,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt: admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60일
    ),
  }, { merge: true });
};

// 5. 저장된 유효한 리프레시 토큰 가져오기
export const getValidRefreshToken = async (uid: string): Promise<string | null> => {
  const doc = await admin.firestore().collection('kakaoSessions').doc(uid).get();
  if (!doc.exists) return null;

  const data = doc.data();
  const now = admin.firestore.Timestamp.now();
  return data?.expiresAt?.toMillis() > now.toMillis() ? data?.refresh_token : null;
};

// 6. 유저 세션 저장
export const saveUserSession = async (kakaoUser: any, refreshToken: string) => {
  const uid = `kakao:${kakaoUser.id}`;
  await admin.firestore().collection('userSessions').doc(uid).set({
    uid,
    nickname: kakaoUser.properties?.nickname,
    email: kakaoUser.kakao_account?.email ?? null,
    profile_image: kakaoUser.properties?.profile_image,
    refresh_token: refreshToken,
    loggedInAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
};
