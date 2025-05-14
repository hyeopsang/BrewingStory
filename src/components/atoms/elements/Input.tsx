/**
 * 완전한 스타일 중립 Input 컴포넌트
 * - 다양한 input type 지원
 * - 스타일 없음: className은 외부에서 전달
 */

import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type InputHTMLAttributes,
} from 'react';

type InputProps = {
  label?: string;
  error?: boolean;
  inputType?: 'text' | 'file' | 'search';
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputType = 'text',
      className = '',
      error = false,
      label,
      onChange,
      ...restProps
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        {label && <label>{label}</label>}

        <input
          type={inputType}
          ref={ref}
          className={className}
          onChange={onChange}
          {...restProps}
        />

        {error && <span>입력값에 문제가 있습니다.</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
