export default function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;

  return (
    <div className="flex h-dvh w-full max-w-mobile flex-col text-left overflow-hidden bg-white">
      <div className="w-full h-[50%] flex flex-col justify-end items-center">
        <p className="w-[70%] text-left text-base font-bold pb-1">Let's create stories together.</p>
        <img src="images/loginLogo.png" className="w-[70%]" alt="로그인 페이지 로고"/>
        <img src="/images/loginImage.png" className="w-[50%] " alt="로그인 페이지 이미지"/>
        </div>
        <a href={KAKAO_AUTH_URL}>
          <img src="./images/login.png" className="w-[80%] h-auto mx-auto" />
        </a>
        
    </div>
  );
}
