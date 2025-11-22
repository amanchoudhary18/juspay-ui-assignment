import { useTheme } from "../hooks/useTheme";
import { ECOMMERCE_METRICS } from "../utils/data";
import arrowUp from "../assets/icons/ArrowRise.svg";
import arrowDown from "../assets/icons/ArrowFall.svg";
import type { ColorKey } from "../utils/colors";
import { ThemedIcon } from "./ThemedIcon";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  backgroundColor: ColorKey;
  index: number;
}

function MetricCard({
  title,
  value,
  change,
  backgroundColor,
  index,
}: MetricCardProps) {
  const { getColor } = useTheme();
  const isPositive = change >= 0;
  const bgColor = getColor(backgroundColor);

  const isLightBackground =
    backgroundColor === "blue" || backgroundColor === "light";
  const textColor =
    index === 1 || index === 2
      ? getColor("text")
      : isLightBackground
      ? getColor("black")
      : getColor("white");

  const formattedChange = `${isPositive ? "+" : ""}${change.toFixed(2)}%`;

  return (
    <div
      className="rounded-lg p-6 flex flex-col gap-2 animate-fade-in-up"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      <p className="text-sm font-semibold">{title}</p>

      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ThemedIcon
              src={arrowUp}
              alt="Up"
              className="w-4 h-4 flex items-center justify-center"
              forceTheme={isLightBackground ? "light" : undefined}
            />
          ) : (
            <ThemedIcon
              src={arrowDown}
              alt="Down"
              className="w-4 h-4 flex items-center justify-center"
              forceTheme={isLightBackground ? "light" : undefined}
            />
          )}
          <p
            style={{
              color: textColor,
            }}
            className="text-xs"
          >
            {formattedChange}
          </p>
        </div>
      </div>
    </div>
  );
}

export function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {ECOMMERCE_METRICS.map((metric, index) => (
        <MetricCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          backgroundColor={metric.backgroundColor}
          index={index}
        />
      ))}
    </div>
  );
}
