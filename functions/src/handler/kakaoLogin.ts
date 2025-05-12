import { Request, Response } from 'express';
import { getTokenFromKakaoCode, getKakaoUserInfo, refreshAccessToken } from '../services/kakaoAuth';
import { success, fail } from '../utils/response';
import admin from '../config/firebase';

// 로그인 및 리프레시 토큰 발급
export const kakaoLoginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, redirectUri } = req.body;

    if (!code || !redirectUri) {
      fail(res, 400, 'code 또는 redirectUri가 필요합니다.');
      return;
    }

    const { access_token, refresh_token, expires_in } = await getTokenFromKakaoCode(code, redirectUri);
    const kakaoUser = await getKakaoUserInfo(access_token);

    const uid = `kakao:${kakaoUser.id}`;
    const sessionRef = admin.firestore().collection('sessions').doc(uid);

    // Firestore에 유저 세션 저장
    await sessionRef.set({
      access_token,
      refresh_token,
      kakaoUser,
      expires_at: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() + expires_in * 1000) // expires_in은 초 단위
      ),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    success(res, { access_token, refresh_token, kakaoUser });
  } catch (error: any) {
    console.error('[KakaoLoginError]', error.message);
    fail(res, 401, error.message);
  }
};

// 리프레시 토큰으로 액세스 토큰 갱신
export const refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refresh_token, uid } = req.body;

    if (!refresh_token || !uid) {
      fail(res, 400, 'refresh_token과 uid가 필요합니다.');
      return;
    }

    const { access_token, refresh_token: newRefreshToken, expires_in } = await refreshAccessToken(refresh_token);

    const sessionRef = admin.firestore().collection('sessions').doc(uid);

    // Firestore의 세션 갱신
    await sessionRef.update({
      access_token,
      refresh_token: newRefreshToken ?? refresh_token,
      expires_at: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() + expires_in * 1000)
      ),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    success(res, {
      access_token,
      refresh_token: newRefreshToken ?? refresh_token,
    });
  } catch (error: any) {
    console.error('[RefreshTokenError]', error.message);
    fail(res, 401, error.message);
  }
};
