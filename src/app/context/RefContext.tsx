import { createContext, useRef, useContext, ReactNode } from "react";
import { Swiper as SwiperType } from "swiper";

// SwiperRef 타입 정의
interface RefContextType {
  swiperRef: React.RefObject<SwiperType | null>;  // RefObject로 수정
}

// Context 생성
const RefContext = createContext<RefContextType | undefined>(undefined);

interface RefProviderProps {
  children: ReactNode;
}

// Context Provider 컴포넌트
export const RefProvider = ({ children }: RefProviderProps) => {
  // Swiper 인스턴스를 저장할 ref
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <RefContext.Provider value={{ swiperRef }}>
      {children}
    </RefContext.Provider>
  );
};

export const useRefContext = () => {
  const context = useContext(RefContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
