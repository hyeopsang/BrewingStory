import {
  forwardRef,
  InputHTMLAttributes,
  ForwardedRef,
  ChangeEvent
} from "react";

type InputProps = {
  type?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className = "",
      onChange,
      ...restProps
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const combinedClassName = `${className}`.trim();

    return (
      <input
        type={type}
        ref={ref}
        onChange={onChange}
        className={combinedClassName}
        {...restProps}
      />
    );
  }
);

Input.displayName = "Input";
