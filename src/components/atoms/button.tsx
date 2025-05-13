import clsx from "clsx";
import {
	type ButtonHTMLAttributes,
	type ForwardedRef,
	type ReactNode,
	forwardRef,
} from "react";

type ButtonSize = "none" | "fit" | "large" | "full";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	size?: ButtonSize;
	isDisabled?: boolean;
	outline?: boolean; // true면 테두리, false면 테두리 없음
}

const sizeClasses: Record<ButtonSize, string> = {
	none: "",
	fit: "w-fit px-2 py-1",
	large: "w-[80%]",
	full: "w-full",
};

export const Button = forwardRef(
	(
		{
			children,
			size = "none",
			isDisabled = false,
			outline = false,
			className = "",
			...restProps
		}: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		const classes = clsx(
			"flex items-center cursor-pointer",
			sizeClasses[size],
			{
				"opacity-50 cursor-not-allowed": isDisabled,
				border: outline,
			},
			className,
		);

		return (
			<button
				ref={ref}
				className={classes}
				disabled={isDisabled}
				{...restProps}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";
