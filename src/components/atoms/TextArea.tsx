import React, {
	forwardRef,
	type HTMLAttributes,
	type ChangeEvent,
	RefObject,
} from "react";

interface TextAreaProps
	extends Omit<HTMLAttributes<HTMLTextAreaElement>, "ref"> {
	id?: string;
	name?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	minLength?: number;
	maxLength?: number;
	placeholder?: string;
	className?: string;
	rows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{ minLength, maxLength, placeholder, className, rows = 4, ...restProps },
		ref,
	) => {
		return (
			<textarea
				ref={ref}
				minLength={minLength}
				maxLength={maxLength}
				placeholder={placeholder}
				className={className}
				rows={rows}
				{...restProps}
			/>
		);
	},
);

TextArea.displayName = "TextArea";
