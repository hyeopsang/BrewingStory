export function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;

  return (
    <div className="max-w-mobile flex h-dvh w-full flex-col overflow-hidden bg-white text-left">
      <div className="flex h-[50%] w-full flex-col items-center justify-end">
        <p className="w-[70%] pb-1 text-left text-base font-bold">
          Let's create stories together.
        </p>
        <img
          src="images/loginLogo.png"
          className="w-[70%]"
          alt="로그인 페이지 로고"
        />
        <img
          src="/images/loginImage.png"
          className="w-[50%]"
          alt="로그인 페이지 이미지"
        />
      </div>
      <a href={KAKAO_AUTH_URL}>
        <img src="./images/login.png" className="mx-auto h-auto w-[80%]" />
      </a>
    </div>
  );
}
