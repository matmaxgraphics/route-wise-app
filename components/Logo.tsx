interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export default function Logo({
  size = 40,
  showWordmark = true,
  className = "",
}: LogoProps) {
  if (showWordmark) {
    return (
      <div className={`flex items-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-light.png"
          alt="RoutePadi"
          style={{ height: size, width: "auto" }}
          className="dark:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-dark.png"
          alt="RoutePadi"
          style={{ height: size, width: "auto" }}
          className="hidden dark:block"
        />
      </div>
    );
  }

  // Icon-only: standalone Padi Pin matching the logo mark
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="RoutePadi"
        className="shrink-0"
      >
        <path
          d="M24 4C15.16 4 8 11.16 8 20C8 32 24 44 24 44C24 44 40 32 40 20C40 11.16 32.84 4 24 4Z"
          fill="rgb(var(--secondary-container))"
          stroke="rgb(var(--on-surface))"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="20" r="5" fill="rgb(var(--on-surface))" />
      </svg>
    </div>
  );
}
