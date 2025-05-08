import { HTMLAttributes, forwardRef, ForwardedRef } from "react";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
}

export const Image = forwardRef(
  (
    {
      src = "",
      alt = "이미지",
      className = "",
      ...restProps
    }: ImageProps,
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    const defaultClass = "h-auto object-cover";
    const combinedClass = `${defaultClass} ${className}`.trim();

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={combinedClass}
        {...restProps}
      />
    );
  }
);

Image.displayName = "Image"; 
