import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useTheme } from "../hooks/useTheme";
import { PROJECTION_DATA } from "../utils/data";

export function ProjectionBarChart() {
  const { getColor, getThemeColor, theme } = useTheme();

  const chartData = PROJECTION_DATA.map((item) => ({
    month: item.month,
    base: -2,
    actuals: item.actuals,
    difference: item.projections - item.actuals,
  }));

  return (
    <div
      className="w-full h-full flex flex-col rounded-[8px] animate-fade-in-up"
      style={{
        backgroundColor: getColor("light"),
        animationDelay: "0.1s",
        opacity: 0,
      }}
    >
      <p
        className="text-sm font-semibold mb-4 px-4 py-2 mt-4"
        style={{ color: getColor("text") }}
      >
        Projections vs Actuals
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
          barCategoryGap="20%"
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
          <Bar dataKey="base" stackId="a" fill="transparent" barSize={20} />
          <Bar
            dataKey="actuals"
            stackId="a"
            fill={theme === "dark" ? getColor("blue") : getColor("cyan")}
            radius={[0, 0, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="difference"
            stackId="a"
            fill={theme === "dark" ? getColor("cyan") : getColor("blue")}
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
