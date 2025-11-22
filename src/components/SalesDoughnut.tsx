import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { Plugin } from "chart.js";
import { SALES_DATA } from "../utils/data";
import { useTheme } from "../hooks/useTheme";

const createCurvedDoughnutPlugin = (
  endCircleColor: string
): Plugin<"doughnut"> => ({
  id: "curvedDoughnutPlugin",
  afterDatasetDraw(chart, args) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(args.index);
    if (!meta?.data) return;

    const getCirclePositions = (arc: {
      x: number;
      y: number;
      startAngle: number;
      endAngle: number;
      innerRadius: number;
      outerRadius: number;
    }) => {
      const { x, y, startAngle, endAngle, innerRadius, outerRadius } = arc;
      const midRadius = innerRadius + (outerRadius - innerRadius) * 0.68;
      const capRadius = (outerRadius - innerRadius) / 2;
      const segmentSpan = endAngle - startAngle;
      const minAbsoluteOffset = Math.PI / 3.5;
      const percentageOffset = 0.5;
      const startOffset = Math.max(
        minAbsoluteOffset,
        segmentSpan * percentageOffset
      );
      const endOffset = Math.max(
        minAbsoluteOffset,
        segmentSpan * percentageOffset
      );
      const START = startAngle + startOffset * 0.07;
      const END = endAngle - endOffset * 0.02;

      return {
        startX: x + Math.cos(START) * midRadius,
        startY: y + Math.sin(START) * midRadius,
        endX: x + Math.cos(END) * midRadius,
        endY: y + Math.sin(END) * midRadius,
        capRadius,
      };
    };

    ctx.save();

    meta.data.forEach((arc) => {
      const a = arc as unknown as {
        x: number;
        y: number;
        startAngle: number;
        endAngle: number;
        innerRadius: number;
        outerRadius: number;
      };
      const { endX, endY, capRadius } = getCirclePositions(a);

      ctx.beginPath();
      ctx.fillStyle = endCircleColor;
      ctx.arc(endX, endY, capRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    meta.data.forEach((arc, i) => {
      const a = arc as unknown as {
        x: number;
        y: number;
        startAngle: number;
        endAngle: number;
        innerRadius: number;
        outerRadius: number;
        options: { backgroundColor?: string | string[] };
      };
      const { options } = a;

      const color = Array.isArray(options.backgroundColor)
        ? options.backgroundColor[i]
        : options.backgroundColor;

      if (!color) return;

      const { startX, startY, capRadius } = getCirclePositions(a);

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(startX, startY, capRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  },
});

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CurvedDoughnut() {
  const { getColor, theme } = useTheme();
  const endCircleColor = theme === "dark" ? "#282828" : "#FFFFFF";
  const data = SALES_DATA.map((item) => ({
    label: item.name,
    value: item.value,
    color: item.color,
  }));

  const total = data.reduce((a, b) => a + b.value, 0);

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 0,
        spacing: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    rotation: 45,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#4A4A4A",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        padding: 6,
        cornerRadius: 6,
        displayColors: false,
        caretSize: 0,
        titleSpacing: 0,
        titleMarginBottom: 0,
        titleFont: {
          size: 0,
        },
        bodyFont: {
          size: 12,
          weight: 600,
        },
        callbacks: {
          label: (context: { parsed: number; label?: string }) => {
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
      },
      roundedDoughnut: {},
    },
  };

  return (
    <div
      className="w-full h-full flex flex-col rounded-[8px] px-4 py-2 animate-fade-in-up"
      style={{
        backgroundColor: getColor("light"),
        animationDelay: "0.4s",
        opacity: 0,
      }}
    >
      <p
        className="text-sm font-semibold mb-4 mt-4"
        style={{ color: getColor("text") }}
      >
        Total Sales
      </p>
      <div className="flex flex-col items-center justify-center relative min-h-[120px]">
        <div className="w-[120px] h-[120px] relative">
          <Doughnut
            data={chartData}
            options={options}
            plugins={[createCurvedDoughnutPlugin(endCircleColor)]}
          />
        </div>
        <div className="mt-6 flex flex-col gap-3 w-full">
          {data.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-2 animate-fade-in"
              style={{
                animationDelay: `${0.5 + index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span
                className="text-xs flex-1"
                style={{ color: getColor("text") }}
              >
                {item.label}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: getColor("text") }}
              >
                ${item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
