import { HTMLAttributes, ElementType, ReactNode } from "react";

type TextColor = "white" | "blue" | "red" | "black" | "gray";
type TextWeight = "normal" | "semibold";

const colorMapping: Record<TextColor, string> = {
  white: "text-white",
  blue: "text-blue-500",
  red: "text-red-500",
  black: "text-[#232323]",
  gray: "text-neutral-400",
};
type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "responsive"
  | "responsive-sm"
  | "responsive-xs"
  | "responsive-lg";

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  children?: ReactNode;
  color?: TextColor;
  weight?: TextWeight;
  as?: ElementType;
  truncate?: boolean;
  className?: string;
  size?: TextSize; // ✅ 여기!
}


export const Text = ({
  children,
  color,
  weight = "normal",
  as: Component = "p",
  truncate = false,
  className = "",
  size,
  ...restProps
}: TextProps) => {
  const sizeClass = size ? `text-${size}` : "";

  const classNames = [
    className,
    `font-${weight}`,
    color ? `${colorMapping[color]}` : "",
    sizeClass,
    truncate ? "truncate" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classNames} {...restProps}>
      {children}
    </Component>
  );
};
