interface BadgeIconProps {
  badgeId: number;
  className?: string;
}

export default function BadgeIcon({ badgeId, className = "w-8 h-8" }: BadgeIconProps) {
  const base = {
    shapeRendering: "crispEdges" as const,
    "aria-hidden": true as const,
    xmlns: "http://www.w3.org/2000/svg",
    className,
  };

  switch (badgeId) {
    case 1:
      return (
        <svg {...base} viewBox="0 0 16 16">
          <rect x="6" y="1" width="1" height="1" fill="#1B231D"/><rect x="7" y="1" width="3" height="1" fill="#D7EA3C"/><rect x="10" y="1" width="1" height="1" fill="#1B231D"/>
          <rect x="4" y="2" width="1" height="1" fill="#1B231D"/><rect x="5" y="2" width="7" height="1" fill="#D7EA3C"/><rect x="12" y="2" width="1" height="1" fill="#1B231D"/>
          <rect x="3" y="3" width="1" height="1" fill="#1B231D"/><rect x="4" y="3" width="9" height="1" fill="#D7EA3C"/><rect x="13" y="3" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="4" width="1" height="1" fill="#1B231D"/><rect x="3" y="4" width="11" height="1" fill="#D7EA3C"/><rect x="14" y="4" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="5" width="1" height="1" fill="#1B231D"/><rect x="3" y="5" width="3" height="1" fill="#0E3B2A"/><rect x="6" y="5" width="8" height="1" fill="#D7EA3C"/><rect x="14" y="5" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="6" width="1" height="1" fill="#1B231D"/><rect x="3" y="6" width="3" height="1" fill="#0E3B2A"/><rect x="6" y="6" width="8" height="1" fill="#D7EA3C"/><rect x="14" y="6" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="7" width="1" height="1" fill="#1B231D"/><rect x="3" y="7" width="3" height="1" fill="#0E3B2A"/><rect x="6" y="7" width="8" height="1" fill="#D7EA3C"/><rect x="14" y="7" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="8" width="1" height="1" fill="#1B231D"/><rect x="3" y="8" width="11" height="1" fill="#D7EA3C"/><rect x="14" y="8" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="9" width="1" height="1" fill="#1B231D"/><rect x="3" y="9" width="11" height="1" fill="#D7EA3C"/><rect x="14" y="9" width="1" height="1" fill="#1B231D"/>
          <rect x="4" y="10" width="3" height="1" fill="#1B231D"/><rect x="10" y="10" width="3" height="1" fill="#1B231D"/>
          <rect x="3" y="11" width="5" height="1" fill="#1B231D"/><rect x="9" y="11" width="5" height="1" fill="#1B231D"/>
          <rect x="3" y="12" width="5" height="1" fill="#1B231D"/><rect x="9" y="12" width="5" height="1" fill="#1B231D"/>
          <rect x="3" y="13" width="5" height="1" fill="#1B231D"/><rect x="9" y="13" width="5" height="1" fill="#1B231D"/>
          <rect x="4" y="14" width="3" height="1" fill="#1B231D"/><rect x="10" y="14" width="3" height="1" fill="#1B231D"/>
        </svg>
      );
    case 2:
      return (
        <svg {...base} viewBox="0 0 18 18">
          <rect x="8" y="1" width="6" height="1" fill="#1B231D"/>
          <rect x="7" y="2" width="2" height="1" fill="#1B231D"/><rect x="9" y="2" width="4" height="1" fill="#D7EA3C"/><rect x="13" y="2" width="2" height="1" fill="#1B231D"/>
          <rect x="6" y="3" width="1" height="1" fill="#1B231D"/><rect x="7" y="3" width="3" height="1" fill="#D7EA3C"/><rect x="10" y="3" width="2" height="1" fill="#A8B82E"/><rect x="12" y="3" width="3" height="1" fill="#D7EA3C"/><rect x="15" y="3" width="1" height="1" fill="#1B231D"/>
          <rect x="5" y="4" width="2" height="1" fill="#1B231D"/><rect x="7" y="4" width="1" height="1" fill="#D7EA3C"/><rect x="8" y="4" width="1" height="1" fill="#A8B82E"/><rect x="9" y="4" width="4" height="1" fill="#D7EA3C"/><rect x="13" y="4" width="1" height="1" fill="#A8B82E"/><rect x="14" y="4" width="1" height="1" fill="#D7EA3C"/><rect x="15" y="4" width="2" height="1" fill="#1B231D"/>
          <rect x="4" y="5" width="2" height="1" fill="#1B231D"/><rect x="6" y="5" width="1" height="1" fill="#D7EA3C"/><rect x="7" y="5" width="1" height="1" fill="#A8B82E"/><rect x="8" y="5" width="6" height="1" fill="#D7EA3C"/><rect x="14" y="5" width="1" height="1" fill="#A8B82E"/><rect x="15" y="5" width="1" height="1" fill="#D7EA3C"/><rect x="16" y="5" width="1" height="1" fill="#1B231D"/>
          <rect x="3" y="6" width="1" height="1" fill="#1B231D"/><rect x="4" y="6" width="1" height="1" fill="#A8B82E"/><rect x="5" y="6" width="1" height="1" fill="#1B231D"/><rect x="6" y="6" width="1" height="1" fill="#D7EA3C"/><rect x="7" y="6" width="1" height="1" fill="#A8B82E"/><rect x="8" y="6" width="6" height="1" fill="#D7EA3C"/><rect x="14" y="6" width="1" height="1" fill="#A8B82E"/><rect x="15" y="6" width="1" height="1" fill="#D7EA3C"/><rect x="16" y="6" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="7" width="1" height="1" fill="#1B231D"/><rect x="3" y="7" width="1" height="1" fill="#A8B82E"/><rect x="4" y="7" width="2" height="1" fill="#1B231D"/><rect x="6" y="7" width="1" height="1" fill="#D7EA3C"/><rect x="7" y="7" width="1" height="1" fill="#A8B82E"/><rect x="8" y="7" width="6" height="1" fill="#D7EA3C"/><rect x="14" y="7" width="1" height="1" fill="#A8B82E"/><rect x="15" y="7" width="1" height="1" fill="#D7EA3C"/><rect x="16" y="7" width="2" height="1" fill="#1B231D"/>
          <rect x="1" y="8" width="1" height="1" fill="#1B231D"/><rect x="2" y="8" width="3" height="1" fill="#A8B82E"/><rect x="5" y="8" width="1" height="1" fill="#1B231D"/><rect x="6" y="8" width="1" height="1" fill="#D7EA3C"/><rect x="7" y="8" width="1" height="1" fill="#A8B82E"/><rect x="8" y="8" width="6" height="1" fill="#D7EA3C"/><rect x="14" y="8" width="1" height="1" fill="#A8B82E"/><rect x="15" y="8" width="1" height="1" fill="#D7EA3C"/><rect x="16" y="8" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="9" width="1" height="1" fill="#1B231D"/><rect x="2" y="9" width="3" height="1" fill="#A8B82E"/><rect x="5" y="9" width="1" height="1" fill="#1B231D"/><rect x="6" y="9" width="1" height="1" fill="#D7EA3C"/><rect x="7" y="9" width="1" height="1" fill="#A8B82E"/><rect x="8" y="9" width="6" height="1" fill="#D7EA3C"/><rect x="14" y="9" width="1" height="1" fill="#A8B82E"/><rect x="15" y="9" width="1" height="1" fill="#D7EA3C"/><rect x="16" y="9" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="10" width="1" height="1" fill="#1B231D"/><rect x="2" y="10" width="3" height="1" fill="#A8B82E"/><rect x="5" y="10" width="2" height="1" fill="#1B231D"/><rect x="7" y="10" width="1" height="1" fill="#D7EA3C"/><rect x="8" y="10" width="1" height="1" fill="#A8B82E"/><rect x="9" y="10" width="4" height="1" fill="#D7EA3C"/><rect x="13" y="10" width="1" height="1" fill="#A8B82E"/><rect x="14" y="10" width="1" height="1" fill="#D7EA3C"/><rect x="15" y="10" width="2" height="1" fill="#1B231D"/>
          <rect x="0" y="11" width="2" height="1" fill="#1B231D"/><rect x="2" y="11" width="4" height="1" fill="#A8B82E"/><rect x="6" y="11" width="1" height="1" fill="#1B231D"/><rect x="7" y="11" width="3" height="1" fill="#D7EA3C"/><rect x="10" y="11" width="2" height="1" fill="#A8B82E"/><rect x="12" y="11" width="3" height="1" fill="#D7EA3C"/><rect x="15" y="11" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="12" width="1" height="1" fill="#1B231D"/><rect x="2" y="12" width="5" height="1" fill="#A8B82E"/><rect x="7" y="12" width="2" height="1" fill="#1B231D"/><rect x="9" y="12" width="4" height="1" fill="#D7EA3C"/><rect x="13" y="12" width="2" height="1" fill="#1B231D"/>
          <rect x="1" y="13" width="1" height="1" fill="#1B231D"/><rect x="2" y="13" width="6" height="1" fill="#A8B82E"/><rect x="8" y="13" width="6" height="1" fill="#1B231D"/>
          <rect x="1" y="14" width="1" height="1" fill="#1B231D"/><rect x="2" y="14" width="11" height="1" fill="#A8B82E"/><rect x="13" y="14" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="15" width="1" height="1" fill="#1B231D"/><rect x="3" y="15" width="9" height="1" fill="#A8B82E"/><rect x="12" y="15" width="1" height="1" fill="#1B231D"/>
          <rect x="3" y="16" width="1" height="1" fill="#1B231D"/><rect x="4" y="16" width="7" height="1" fill="#A8B82E"/><rect x="11" y="16" width="1" height="1" fill="#1B231D"/>
          <rect x="4" y="17" width="7" height="1" fill="#1B231D"/>
        </svg>
      );
    case 3:
      return (
        <svg {...base} viewBox="0 0 16 16">
          <rect x="3" y="0" width="1" height="1" fill="#1B231D"/><rect x="4" y="0" width="8" height="1" fill="#D7EA3C"/><rect x="12" y="0" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="1" width="1" height="1" fill="#1B231D"/><rect x="3" y="1" width="10" height="1" fill="#D7EA3C"/><rect x="13" y="1" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="2" width="1" height="1" fill="#1B231D"/><rect x="3" y="2" width="10" height="1" fill="#D7EA3C"/><rect x="13" y="2" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="3" width="1" height="1" fill="#1B231D"/><rect x="3" y="3" width="10" height="1" fill="#D7EA3C"/><rect x="13" y="3" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="4" width="1" height="1" fill="#1B231D"/><rect x="3" y="4" width="1" height="1" fill="#D7EA3C"/><rect x="4" y="4" width="1" height="1" fill="#A8B82E"/><rect x="5" y="4" width="5" height="1" fill="#D7EA3C"/><rect x="10" y="4" width="1" height="1" fill="#A8B82E"/><rect x="11" y="4" width="2" height="1" fill="#D7EA3C"/><rect x="13" y="4" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="5" width="1" height="1" fill="#1B231D"/><rect x="3" y="5" width="1" height="1" fill="#D7EA3C"/><rect x="4" y="5" width="1" height="1" fill="#A8B82E"/><rect x="5" y="5" width="5" height="1" fill="#D7EA3C"/><rect x="10" y="5" width="1" height="1" fill="#A8B82E"/><rect x="11" y="5" width="2" height="1" fill="#D7EA3C"/><rect x="13" y="5" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="6" width="1" height="1" fill="#1B231D"/><rect x="3" y="6" width="10" height="1" fill="#D7EA3C"/><rect x="13" y="6" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="7" width="1" height="1" fill="#1B231D"/><rect x="3" y="7" width="10" height="1" fill="#D7EA3C"/><rect x="13" y="7" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="8" width="1" height="1" fill="#1B231D"/><rect x="3" y="8" width="10" height="1" fill="#D7EA3C"/><rect x="13" y="8" width="1" height="1" fill="#1B231D"/>
          <rect x="3" y="9" width="1" height="1" fill="#1B231D"/><rect x="4" y="9" width="1" height="1" fill="#A8B82E"/><rect x="5" y="9" width="5" height="1" fill="#D7EA3C"/><rect x="10" y="9" width="1" height="1" fill="#A8B82E"/><rect x="11" y="9" width="1" height="1" fill="#D7EA3C"/><rect x="12" y="9" width="1" height="1" fill="#1B231D"/>
          <rect x="3" y="10" width="1" height="1" fill="#1B231D"/><rect x="4" y="10" width="1" height="1" fill="#A8B82E"/><rect x="5" y="10" width="5" height="1" fill="#D7EA3C"/><rect x="10" y="10" width="1" height="1" fill="#A8B82E"/><rect x="11" y="10" width="1" height="1" fill="#D7EA3C"/><rect x="12" y="10" width="1" height="1" fill="#1B231D"/>
          <rect x="4" y="11" width="1" height="1" fill="#1B231D"/><rect x="5" y="11" width="6" height="1" fill="#D7EA3C"/><rect x="11" y="11" width="1" height="1" fill="#1B231D"/>
          <rect x="4" y="12" width="1" height="1" fill="#1B231D"/><rect x="5" y="12" width="6" height="1" fill="#D7EA3C"/><rect x="11" y="12" width="1" height="1" fill="#1B231D"/>
          <rect x="5" y="13" width="1" height="1" fill="#1B231D"/><rect x="6" y="13" width="4" height="1" fill="#D7EA3C"/><rect x="10" y="13" width="1" height="1" fill="#1B231D"/>
          <rect x="6" y="14" width="1" height="1" fill="#1B231D"/><rect x="7" y="14" width="2" height="1" fill="#D7EA3C"/><rect x="9" y="14" width="1" height="1" fill="#1B231D"/>
          <rect x="7" y="15" width="2" height="1" fill="#1B231D"/>
        </svg>
      );
    case 4:
      return (
        <svg {...base} viewBox="0 0 16 16">
          <rect x="6" y="1" width="1" height="1" fill="#1B231D"/><rect x="7" y="1" width="5" height="1" fill="#D7EA3C"/><rect x="12" y="1" width="1" height="1" fill="#1B231D"/>
          <rect x="6" y="2" width="1" height="1" fill="#1B231D"/><rect x="7" y="2" width="4" height="1" fill="#D7EA3C"/><rect x="11" y="2" width="1" height="1" fill="#1B231D"/>
          <rect x="6" y="3" width="1" height="1" fill="#1B231D"/><rect x="7" y="3" width="4" height="1" fill="#D7EA3C"/><rect x="11" y="3" width="1" height="1" fill="#1B231D"/>
          <rect x="6" y="4" width="1" height="1" fill="#1B231D"/><rect x="7" y="4" width="3" height="1" fill="#D7EA3C"/><rect x="10" y="4" width="1" height="1" fill="#1B231D"/>
          <rect x="6" y="5" width="1" height="1" fill="#1B231D"/><rect x="7" y="5" width="2" height="1" fill="#D7EA3C"/><rect x="9" y="5" width="1" height="1" fill="#1B231D"/>
          <rect x="6" y="6" width="1" height="1" fill="#1B231D"/><rect x="7" y="6" width="1" height="1" fill="#D7EA3C"/><rect x="8" y="6" width="1" height="1" fill="#1B231D"/>
          <rect x="6" y="7" width="2" height="1" fill="#1B231D"/>
          <rect x="6" y="8" width="2" height="1" fill="#1B231D"/>
          <rect x="6" y="9" width="2" height="1" fill="#1B231D"/>
          <rect x="6" y="10" width="2" height="1" fill="#1B231D"/>
          <rect x="6" y="11" width="2" height="1" fill="#1B231D"/>
          <rect x="6" y="12" width="2" height="1" fill="#1B231D"/>
          <rect x="4" y="13" width="6" height="1" fill="#1B231D"/>
        </svg>
      );
    case 5:
      return (
        <svg {...base} viewBox="0 0 18 18">
          <rect x="6" y="1" width="6" height="1" fill="#1B231D"/>
          <rect x="4" y="2" width="3" height="1" fill="#1B231D"/><rect x="7" y="2" width="4" height="1" fill="#FAF6EC"/><rect x="11" y="2" width="3" height="1" fill="#1B231D"/>
          <rect x="3" y="3" width="2" height="1" fill="#1B231D"/><rect x="5" y="3" width="8" height="1" fill="#FAF6EC"/><rect x="13" y="3" width="2" height="1" fill="#1B231D"/>
          <rect x="2" y="4" width="2" height="1" fill="#1B231D"/><rect x="4" y="4" width="10" height="1" fill="#FAF6EC"/><rect x="14" y="4" width="2" height="1" fill="#1B231D"/>
          <rect x="2" y="5" width="1" height="1" fill="#1B231D"/><rect x="3" y="5" width="5" height="1" fill="#FAF6EC"/><rect x="8" y="5" width="1" height="1" fill="#D7EA3C"/><rect x="9" y="5" width="1" height="1" fill="#0E3B2A"/><rect x="10" y="5" width="5" height="1" fill="#FAF6EC"/><rect x="15" y="5" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="6" width="2" height="1" fill="#1B231D"/><rect x="3" y="6" width="4" height="1" fill="#FAF6EC"/><rect x="7" y="6" width="2" height="1" fill="#D7EA3C"/><rect x="9" y="6" width="2" height="1" fill="#0E3B2A"/><rect x="11" y="6" width="4" height="1" fill="#FAF6EC"/><rect x="15" y="6" width="2" height="1" fill="#1B231D"/>
          <rect x="1" y="7" width="1" height="1" fill="#1B231D"/><rect x="2" y="7" width="4" height="1" fill="#FAF6EC"/><rect x="6" y="7" width="3" height="1" fill="#D7EA3C"/><rect x="9" y="7" width="3" height="1" fill="#0E3B2A"/><rect x="12" y="7" width="4" height="1" fill="#FAF6EC"/><rect x="16" y="7" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="8" width="1" height="1" fill="#1B231D"/><rect x="2" y="8" width="3" height="1" fill="#FAF6EC"/><rect x="5" y="8" width="4" height="1" fill="#D7EA3C"/><rect x="9" y="8" width="4" height="1" fill="#0E3B2A"/><rect x="13" y="8" width="3" height="1" fill="#FAF6EC"/><rect x="16" y="8" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="9" width="1" height="1" fill="#1B231D"/><rect x="2" y="9" width="3" height="1" fill="#FAF6EC"/><rect x="5" y="9" width="4" height="1" fill="#D7EA3C"/><rect x="9" y="9" width="4" height="1" fill="#0E3B2A"/><rect x="13" y="9" width="3" height="1" fill="#FAF6EC"/><rect x="16" y="9" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="10" width="1" height="1" fill="#1B231D"/><rect x="2" y="10" width="4" height="1" fill="#FAF6EC"/><rect x="6" y="10" width="3" height="1" fill="#D7EA3C"/><rect x="9" y="10" width="3" height="1" fill="#0E3B2A"/><rect x="12" y="10" width="4" height="1" fill="#FAF6EC"/><rect x="16" y="10" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="11" width="2" height="1" fill="#1B231D"/><rect x="3" y="11" width="4" height="1" fill="#FAF6EC"/><rect x="7" y="11" width="2" height="1" fill="#D7EA3C"/><rect x="9" y="11" width="2" height="1" fill="#0E3B2A"/><rect x="11" y="11" width="4" height="1" fill="#FAF6EC"/><rect x="15" y="11" width="2" height="1" fill="#1B231D"/>
          <rect x="2" y="12" width="1" height="1" fill="#1B231D"/><rect x="3" y="12" width="5" height="1" fill="#FAF6EC"/><rect x="8" y="12" width="1" height="1" fill="#D7EA3C"/><rect x="9" y="12" width="1" height="1" fill="#0E3B2A"/><rect x="10" y="12" width="5" height="1" fill="#FAF6EC"/><rect x="15" y="12" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="13" width="2" height="1" fill="#1B231D"/><rect x="4" y="13" width="10" height="1" fill="#FAF6EC"/><rect x="14" y="13" width="2" height="1" fill="#1B231D"/>
          <rect x="3" y="14" width="2" height="1" fill="#1B231D"/><rect x="5" y="14" width="8" height="1" fill="#FAF6EC"/><rect x="13" y="14" width="2" height="1" fill="#1B231D"/>
          <rect x="4" y="15" width="3" height="1" fill="#1B231D"/><rect x="7" y="15" width="4" height="1" fill="#FAF6EC"/><rect x="11" y="15" width="3" height="1" fill="#1B231D"/>
          <rect x="6" y="16" width="6" height="1" fill="#1B231D"/>
        </svg>
      );
    case 6:
    default:
      return (
        <svg {...base} viewBox="0 0 16 12">
          <rect x="1" y="1" width="1" height="1" fill="#1B231D"/><rect x="6" y="1" width="2" height="1" fill="#1B231D"/><rect x="12" y="1" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="2" width="1" height="1" fill="#D7EA3C"/><rect x="2" y="2" width="1" height="1" fill="#1B231D"/><rect x="6" y="2" width="2" height="1" fill="#D7EA3C"/><rect x="11" y="2" width="1" height="1" fill="#1B231D"/><rect x="12" y="2" width="1" height="1" fill="#D7EA3C"/>
          <rect x="1" y="3" width="2" height="1" fill="#D7EA3C"/><rect x="3" y="3" width="1" height="1" fill="#1B231D"/><rect x="5" y="3" width="1" height="1" fill="#1B231D"/><rect x="6" y="3" width="3" height="1" fill="#D7EA3C"/><rect x="9" y="3" width="1" height="1" fill="#1B231D"/><rect x="11" y="3" width="1" height="1" fill="#1B231D"/><rect x="12" y="3" width="2" height="1" fill="#D7EA3C"/>
          <rect x="1" y="4" width="3" height="1" fill="#D7EA3C"/><rect x="4" y="4" width="1" height="1" fill="#1B231D"/><rect x="5" y="4" width="5" height="1" fill="#D7EA3C"/><rect x="10" y="4" width="1" height="1" fill="#1B231D"/><rect x="11" y="4" width="3" height="1" fill="#D7EA3C"/>
          <rect x="1" y="5" width="13" height="1" fill="#D7EA3C"/>
          <rect x="1" y="6" width="13" height="1" fill="#1B231D"/>
          <rect x="1" y="7" width="13" height="1" fill="#D7EA3C"/>
          <rect x="1" y="8" width="13" height="1" fill="#D7EA3C"/>
          <rect x="1" y="9" width="13" height="1" fill="#1B231D"/>
        </svg>
      );
    case 7:
      return (
        <svg {...base} viewBox="0 0 18 10">
          <rect x="0" y="0" width="1" height="1" fill="#1B231D"/><rect x="1" y="0" width="2" height="1" fill="#0E3B2A"/><rect x="3" y="0" width="1" height="1" fill="#1B231D"/><rect x="14" y="0" width="1" height="1" fill="#1B231D"/><rect x="15" y="0" width="2" height="1" fill="#D7EA3C"/><rect x="17" y="0" width="1" height="1" fill="#1B231D"/>
          <rect x="0" y="1" width="1" height="1" fill="#1B231D"/><rect x="1" y="1" width="3" height="1" fill="#0E3B2A"/><rect x="4" y="1" width="1" height="1" fill="#1B231D"/><rect x="13" y="1" width="1" height="1" fill="#1B231D"/><rect x="14" y="1" width="3" height="1" fill="#D7EA3C"/><rect x="17" y="1" width="1" height="1" fill="#1B231D"/>
          <rect x="1" y="2" width="1" height="1" fill="#1B231D"/><rect x="2" y="2" width="3" height="1" fill="#0E3B2A"/><rect x="5" y="2" width="1" height="1" fill="#1B231D"/><rect x="12" y="2" width="1" height="1" fill="#1B231D"/><rect x="13" y="2" width="3" height="1" fill="#D7EA3C"/><rect x="16" y="2" width="1" height="1" fill="#1B231D"/>
          <rect x="2" y="3" width="1" height="1" fill="#1B231D"/><rect x="3" y="3" width="3" height="1" fill="#0E3B2A"/><rect x="6" y="3" width="1" height="1" fill="#1B231D"/><rect x="11" y="3" width="1" height="1" fill="#1B231D"/><rect x="12" y="3" width="3" height="1" fill="#D7EA3C"/><rect x="15" y="3" width="1" height="1" fill="#1B231D"/>
          <rect x="3" y="4" width="1" height="1" fill="#1B231D"/><rect x="4" y="4" width="3" height="1" fill="#0E3B2A"/><rect x="7" y="4" width="1" height="1" fill="#1B231D"/><rect x="10" y="4" width="1" height="1" fill="#1B231D"/><rect x="11" y="4" width="3" height="1" fill="#D7EA3C"/><rect x="14" y="4" width="1" height="1" fill="#1B231D"/>
          <rect x="4" y="5" width="1" height="1" fill="#1B231D"/><rect x="5" y="5" width="3" height="1" fill="#0E3B2A"/><rect x="8" y="5" width="2" height="1" fill="#1B231D"/><rect x="10" y="5" width="3" height="1" fill="#D7EA3C"/><rect x="13" y="5" width="1" height="1" fill="#1B231D"/>
          <rect x="3" y="6" width="12" height="1" fill="#1B231D"/>
          <rect x="4" y="7" width="1" height="1" fill="#1B231D"/><rect x="5" y="7" width="2" height="1" fill="#A8B82E"/><rect x="7" y="7" width="2" height="1" fill="#D7EA3C"/><rect x="9" y="7" width="2" height="1" fill="#A8B82E"/><rect x="11" y="7" width="1" height="1" fill="#D7EA3C"/><rect x="12" y="7" width="2" height="1" fill="#1B231D"/>
          <rect x="5" y="8" width="1" height="1" fill="#1B231D"/><rect x="6" y="8" width="2" height="1" fill="#D7EA3C"/><rect x="8" y="8" width="2" height="1" fill="#A8B82E"/><rect x="10" y="8" width="3" height="1" fill="#1B231D"/>
          <rect x="7" y="9" width="4" height="1" fill="#1B231D"/>
        </svg>
      );
  }
}
