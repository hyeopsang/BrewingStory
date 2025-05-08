import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  target?: string;
  children?: ReactNode;
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ href = "", target = "", children, className = "", ...restProps }, ref) => {
    const baseClass =
      "w-fit h-fit flex justify-center items-center gap-2 bg-transparent";
    const combinedClassName = `${baseClass} ${className}`.trim();

    return (
      <a
        href={href}
        target={target}
        ref={ref}
        className={combinedClassName}
        {...restProps}
      >
        {children}
      </a>
    );
  }
);

Anchor.displayName = "Anchor";
