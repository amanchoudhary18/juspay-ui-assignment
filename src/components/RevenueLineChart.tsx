import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useTheme } from "../hooks/useTheme";
import { REVENUE_DATA, REVENUE_LEGEND } from "../utils/data";

export function RevenueLineChart() {
  const { getColor, getThemeColor, theme } = useTheme();

  const chartData = REVENUE_DATA.map((item, index) => ({
    ...item,
    solid: index <= 3 ? item.currentWeek : null,
    dashed: index >= 3 ? item.currentWeek : null,
  }));

  return (
    <div
      className="w-full h-[313px] flex flex-col rounded-[8px] animate-fade-in-up"
      style={{
        backgroundColor: getColor("light"),
        animationDelay: "0.2s",
        opacity: 0,
      }}
    >
      <div className="flex items-center justify-between px-6 py-2 mt-4 mb-4">
        <div className="flex items-center gap-4">
          <p
            className="text-sm font-semibold"
            style={{ color: getColor("text") }}
          >
            Revenue
          </p>

          <div
            className="h-4 w-px"
            style={{ backgroundColor: getThemeColor("#1C1C1C33") }}
          />

          <div className="flex items-center gap-1 py-[2px] px-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getColor("black") }}
            />
            <span className="text-xs" style={{ color: getColor("text") }}>
              {REVENUE_LEGEND.currentWeek.label}:{" "}
              <span className="font-semibold">
                $ {REVENUE_LEGEND.currentWeek.value.toLocaleString()}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1 py-[2px] px-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getColor("cyan") }}
            />
            <span className="text-xs" style={{ color: getColor("text") }}>
              {REVENUE_LEGEND.previousWeek.label}:{" "}
              <span className="font-semibold">
                $ {REVENUE_LEGEND.previousWeek.value.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={232}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <ReferenceLine
            y={-2}
            stroke={getThemeColor("#1C1C1C66")}
            strokeWidth={1}
          />
          <ReferenceLine
            y={8}
            stroke={getThemeColor("#1C1C1C0D")}
            strokeWidth={1}
          />
          <ReferenceLine
            y={18}
            stroke={getThemeColor("#1C1C1C0D")}
            strokeWidth={1}
          />
          <ReferenceLine
            y={28}
            stroke={getThemeColor("#1C1C1C0D")}
            strokeWidth={1}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: getThemeColor("#1c1c1c66"), fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: getThemeColor("#1C1C1C66"), fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v === 0 ? "0" : `${v}M`)}
            domain={[-2, 30]}
            ticks={[0, 10, 20, 30]}
          />

          <Line
            type="monotone"
            dataKey="currentWeek"
            stroke="transparent"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
            connectNulls={true}
          />

          <Line
            type="monotone"
            dataKey="previousWeek"
            stroke={theme === "dark" ? "#C6C7F8" : getColor("blue")}
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="solid"
            stroke={theme === "dark" ? "#C6C7F8" : getColor("black")}
            strokeWidth={3}
            dot={false}
            connectNulls={true}
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="dashed"
            stroke={theme === "dark" ? "#C6C7F8" : getColor("black")}
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={false}
            connectNulls={true}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
