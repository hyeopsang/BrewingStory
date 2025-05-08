import { HTMLAttributes, ElementType, ReactNode } from "react";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextColor = "white" | "blue" | "red" | "black" | "gray";
type TextWeight = "normal" | "semibold";

const colorMapping: Record<TextColor, string> = {
  white: "white",
  blue: "blue-500",
  red: "red-500",
  black: "neutral-900",
  gray: "neutral-500",
};

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  children?: ReactNode;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  as?: ElementType;
  truncate?: boolean;
  className?: string;
}

export const Text = ({
  children,
  size,
  color,
  weight,
  as: Component = "p",
  truncate = false,
  className = "",
  ...restProps
}: TextProps) => {
  const classNames = [
    className,
    `font-${weight}`,
    `text-${size}`,
    `text-${colorMapping[color]}`,
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
