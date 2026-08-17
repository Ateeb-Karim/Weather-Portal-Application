import { codeCategory, WeatherIconProps } from "@/types/weatherTypes";
import { JSX } from "react/jsx-runtime";

function getCategory(code: number): codeCategory {
  if (code >= 200 && code < 300) return "thunderstorm";
  if (code >= 300 && code < 400) return "drizzle";
  if (code >= 500 && code < 600) return "rain";
  if (code >= 600 && code < 700) return "snow";
  if (code >= 700 && code < 800) return "mist";
  if (code === 800) return "clear";
  if (code > 800 && code < 900) return "clouds";
  return "clear";
}

const GlassDefs = () => (
  <defs>
    <linearGradient id="glassBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
    </linearGradient>
    <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
    </radialGradient>
    <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

const ClearIcon = (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    role="img"
    aria-label="Clear sky"
  >
    <GlassDefs />
    <circle cx="50" cy="50" r="34" fill="url(#sunGlow)" />
    <circle
      cx="50"
      cy="50"
      r="20"
      fill="url(#glassBody)"
      stroke="url(#glassEdge)"
      strokeWidth="1.5"
    />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      const rad = (angle * Math.PI) / 180;
      const x1 = 50 + Math.cos(rad) * 28;
      const y1 = 50 + Math.sin(rad) * 28;
      const x2 = 50 + Math.cos(rad) * 38;
      const y2 = 50 + Math.sin(rad) * 38;
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#ffffff"
          strokeOpacity="0.75"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

const CloudsIcon = (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    role="img"
    aria-label="Cloudy"
  >
    <GlassDefs />
    <ellipse
      cx="42"
      cy="60"
      rx="16"
      ry="16"
      fill="url(#glassBody)"
      opacity="0.7"
    />
    <ellipse
      cx="58"
      cy="52"
      rx="26"
      ry="22"
      fill="url(#glassBody)"
      stroke="url(#glassEdge)"
      strokeWidth="1.5"
    />
    <ellipse
      cx="36"
      cy="54"
      rx="14"
      ry="12"
      fill="url(#glassBody)"
      opacity="0.85"
    />
  </svg>
);

const MistIcon = (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    role="img"
    aria-label="Mist"
  >
    <GlassDefs />
    <ellipse
      cx="50"
      cy="42"
      rx="24"
      ry="18"
      fill="url(#glassBody)"
      stroke="url(#glassEdge)"
      strokeWidth="1.5"
    />
    {[54, 62, 70, 78].map((y, i) => (
      <line
        key={y}
        x1={26 - i * 2}
        y1={y}
        x2={74 + i * 2}
        y2={y}
        stroke="#ffffff"
        strokeOpacity={0.55 - i * 0.08}
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

const RainIcon = (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    role="img"
    aria-label="Rain"
  >
    <GlassDefs />
    <ellipse
      cx="42"
      cy="42"
      rx="15"
      ry="14"
      fill="url(#glassBody)"
      opacity="0.7"
    />
    <ellipse
      cx="56"
      cy="36"
      rx="24"
      ry="19"
      fill="url(#glassBody)"
      stroke="url(#glassEdge)"
      strokeWidth="1.5"
    />
    {[36, 50, 64].map((x, i) => (
      <line
        key={x}
        x1={x}
        y1={60}
        x2={x - 5}
        y2={78 + (i % 2 === 0 ? 0 : 4)}
        stroke="#BFE3FF"
        strokeOpacity="0.85"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

const DrizzleIcon = (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    role="img"
    aria-label="Drizzle"
  >
    <GlassDefs />
    <ellipse
      cx="42"
      cy="40"
      rx="14"
      ry="13"
      fill="url(#glassBody)"
      opacity="0.7"
    />
    <ellipse
      cx="56"
      cy="34"
      rx="22"
      ry="17"
      fill="url(#glassBody)"
      stroke="url(#glassEdge)"
      strokeWidth="1.5"
    />
    {[38, 48, 58, 68].map((x, i) => (
      <circle
        key={x}
        cx={x}
        cy={64 + (i % 2) * 8}
        r="2"
        fill="#BFE3FF"
        fillOpacity="0.85"
      />
    ))}
  </svg>
);

const ThunderstormIcon = (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    role="img"
    aria-label="Thunderstorm"
  >
    <GlassDefs />
    <ellipse
      cx="40"
      cy="38"
      rx="14"
      ry="13"
      fill="url(#glassBody)"
      opacity="0.7"
    />
    <ellipse
      cx="55"
      cy="32"
      rx="23"
      ry="18"
      fill="url(#glassBody)"
      stroke="url(#glassEdge)"
      strokeWidth="1.5"
    />
    <polygon
      points="54,54 42,74 50,74 44,90 66,66 56,66 62,54"
      fill="#FFE9A8"
      fillOpacity="0.9"
      stroke="#ffffff"
      strokeOpacity="0.6"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

const SnowIcon = (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    role="img"
    aria-label="Snow"
  >
    <GlassDefs />
    <ellipse
      cx="42"
      cy="38"
      rx="14"
      ry="13"
      fill="url(#glassBody)"
      opacity="0.7"
    />
    <ellipse
      cx="56"
      cy="32"
      rx="22"
      ry="17"
      fill="url(#glassBody)"
      stroke="url(#glassEdge)"
      strokeWidth="1.5"
    />
    {[38, 52, 66].map((x, i) => (
      <g key={x} transform={`translate(${x} ${68 + (i % 2) * 10})`}>
        {[0, 60, 120].map((angle) => (
          <line
            key={angle}
            x1={-6}
            y1={0}
            x2={6}
            y2={0}
            stroke="#ffffff"
            strokeOpacity="0.85"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    ))}
  </svg>
);

const icons: Record<codeCategory, JSX.Element> = {
  clear: ClearIcon,
  clouds: CloudsIcon,
  mist: MistIcon,
  rain: RainIcon,
  drizzle: DrizzleIcon,
  thunderstorm: ThunderstormIcon,
  snow: SnowIcon,
};

export default function WeatherIcon({
  code,
  size = 140,
  className = "",
}: WeatherIconProps) {
  const category = getCategory(code);

  return (
    <div
      className={`drop-shadow-lg ${className}`}
      style={{ width: size, height: size }}
    >
      {icons[category]}
    </div>
  );
}
