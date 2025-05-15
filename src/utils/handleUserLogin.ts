// src/lib/auth.ts
import { getUser, updateUser } from '@api/user';
import { loginSuccess } from '@app/redux/authSlice';

export const handleUserLogin = async (
  kakaoUser: any,
  accessToken: string,
  dispatch: any,
  navigate: any
) => {
  try {
    if (!kakaoUser || !accessToken) return;

    const userId = String(kakaoUser.id);
    const existingUser = await getUser(userId);
    console.log(existingUser);
    dispatch(loginSuccess(existingUser));

    const shouldUpdate =
      !existingUser || existingUser.nickname !== kakaoUser.properties.nickname;

    if (shouldUpdate) {
      await updateUser(userId, {
        nickname: kakaoUser.properties.nickname,
      });
    }

    navigate('/');
  } catch (error) {
    console.error('User login handling failed:', error);
  }
};
