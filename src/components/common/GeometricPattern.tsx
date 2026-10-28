export default function GeometricPattern({
  className,
  size = 240,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="120" cy="120" r="112" />
      <circle cx="120" cy="120" r="81" />
      <path d="M120 8 153 40 200 40 200 87 232 120 200 153 200 200 153 200 120 232 87 200 40 200 40 153 8 120 40 87 40 40 87 40Z" />
      <path d="M120 40 143 65 176 64 175 97 200 120 175 143 176 176 143 175 120 200 97 175 64 176 65 143 40 120 65 97 64 64 97 65Z" />
      <path d="m120 8 80 192H40L120 8Zm112 112L40 40v160l192-80ZM120 232 40 40h160l-80 192ZM8 120l192 80V40L8 120Z" />
      <path d="m120 81 12 27 27 12-27 12-12 27-12-27-27-12 27-12Z" />
    </svg>
  );
}
