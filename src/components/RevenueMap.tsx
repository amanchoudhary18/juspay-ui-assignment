import { useTheme } from "../hooks/useTheme";
import { REVENUE_BY_LOCATION } from "../utils/data";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function RevenueMap() {
  const { getColor, theme } = useTheme();

  const maxRevenue = 100;

  return (
    <div
      className="w-full h-[313px] flex flex-col rounded-[8px] p-6 animate-fade-in-up"
      style={{
        backgroundColor: getColor("light"),
        animationDelay: "0.3s",
        opacity: 0,
      }}
    >
      <p className="text-sm font-semibold" style={{ color: getColor("text") }}>
        Revenue by Location
      </p>

      <div
        className="flex-1 rounded-lg overflow-hidden relative"
        style={{
          backgroundColor: "transparent",
          height: "280px",
        }}
      >
        <ComposableMap
          projectionConfig={{
            scale: 220,
            center: [20, 20],
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <filter
              id="markerShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => {
                  const name =
                    geo.properties?.NAME || geo.properties?.name || "";
                  const nameLower = name.toLowerCase();

                  if (nameLower.includes("antarctica")) return false;
                  return true;
                })
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={"#A8C5DA77"}
                    stroke={theme === "dark" ? "#1c1c1c" : "#FFFFFF"}
                    strokeWidth={2}
                    style={{
                      default: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
            }
          </Geographies>

          {REVENUE_BY_LOCATION.map((location) => {
            const markerSize = 14;

            return (
              <Marker key={location.id} coordinates={location.coordinates}>
                <g>
                  <circle
                    r={markerSize}
                    fill={getColor("black")}
                    stroke="#FFFFFF"
                    strokeWidth={6}
                    filter="url(#markerShadow)"
                  />
                </g>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        {REVENUE_BY_LOCATION.map((location, index) => {
          const fillPercentage = Math.min(
            (location.revenue / maxRevenue) * 100,
            100
          );

          return (
            <div
              key={location.id}
              className="flex flex-col gap-1 animate-fade-in"
              style={{
                animationDelay: `${0.4 + index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: getColor("text") }}>
                  {location.name}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: getColor("text") }}
                >
                  ${location.revenue}K
                </span>
              </div>

              <div
                className="w-full h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: getColor("blue") }}
              >
                <div
                  className="h-full rounded-full"
                  style={
                    {
                      width: `${fillPercentage}%`,
                      backgroundColor: getColor("cyan"),
                      animation: "fillProgress 1s ease-out forwards",
                      "--target-width": `${fillPercentage}%`,
                    } as React.CSSProperties & { "--target-width": string }
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
