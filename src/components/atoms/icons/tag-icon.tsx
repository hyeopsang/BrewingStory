export const TagIcon = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 2v2" />
      <path d="M17.915 22a6 6 0 0 0-12 0" />
      <path d="M8 2v2" />
      <circle cx="12" cy="12" r="4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
    </svg>
  );
};
