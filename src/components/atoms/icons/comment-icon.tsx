export function CommentIcon({
  className = '',
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M6.9 18.0079C8.80858 18.9869 11.0041 19.2521 13.0909 18.7556C15.1777 18.2592 17.0186 17.0337 18.2818 15.3C19.545 13.5664 20.1474 11.4386 19.9806 9.30002C19.8137 7.16147 18.8886 5.15283 17.3718 3.63605C15.855 2.11928 13.8464 1.19411 11.7078 1.02728C9.56929 0.860441 7.44147 1.46291 5.70782 2.72611C3.97417 3.98931 2.74869 5.83017 2.25222 7.91697C1.75575 10.0038 2.02094 12.1993 3 14.1079L1 20.0079L6.9 18.0079Z"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 10.0079H7.01"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 10.0079H11.01"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 10.0079H15.01"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
