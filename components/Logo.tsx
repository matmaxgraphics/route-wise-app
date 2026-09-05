interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

/**
 * The Padi Pin -- RoutePadi's locked brand mark (Brand Bible, Concept A).
 * A route-pin silhouette in Chartreuse with a Charcoal outline, set inside
 * a solid Forest circle. No gradients, per the brand's core visual rule.
 */
export default function Logo({
  size = 40,
  showWordmark = true,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="20" cy="20" r="20" fill="rgb(var(--primary))" />
        <path
          d="M20 9c-4.42 0-8 3.58-8 8 0 6 8 14 8 14s8-8 8-14c0-4.42-3.58-8-8-8Z"
          fill="rgb(var(--secondary-container))"
          stroke="rgb(var(--on-surface))"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="17" r="3" fill="rgb(var(--on-surface))" />
      </svg>
      {showWordmark && (
        <span className="font-display font-extrabold text-xl md:text-2xl text-[rgb(var(--on-surface))] tracking-tight">
          RoutePadi
        </span>
      )}
    </div>
  );
}
