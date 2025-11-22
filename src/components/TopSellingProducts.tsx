import { useTheme } from "../hooks/useTheme";
import { TOP_SELLING_PRODUCTS } from "../utils/data";

export function TopSellingProducts() {
  const { getColor, getThemeColor } = useTheme();

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div
      className="rounded-[8px] p-6 animate-fade-in-up"
      style={{
        backgroundColor: getColor("light"),
        animationDelay: "0.5s",
        opacity: 0,
      }}
    >
      <p
        className="text-sm font-semibold mb-4"
        style={{ color: getColor("text") }}
      >
        Top Selling Products
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th
                className="text-left pb-3 text-xs font-normal border-b"
                style={{
                  color: getThemeColor("#1C1C1C66"),
                  borderColor: getThemeColor("#1C1C1C33"),
                }}
              >
                Name
              </th>
              <th
                className="text-left pb-3 text-xs font-normal border-b"
                style={{
                  color: getThemeColor("#1C1C1C66"),
                  borderColor: getThemeColor("#1C1C1C33"),
                }}
              >
                Price
              </th>
              <th
                className="text-left pb-3 text-xs font-normal border-b"
                style={{
                  color: getThemeColor("#1C1C1C66"),
                  borderColor: getThemeColor("#1C1C1C33"),
                }}
              >
                Quantity
              </th>
              <th
                className="text-left pb-3 text-xs font-normal border-b"
                style={{
                  color: getThemeColor("#1C1C1C66"),
                  borderColor: getThemeColor("#1C1C1C33"),
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {TOP_SELLING_PRODUCTS.map((product, index) => (
              <tr
                key={product.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${0.6 + index * 0.05}s`,
                  opacity: 0,
                }}
              >
                <td
                  className="text-sm pb-3 pt-3"
                  style={{ color: getColor("text") }}
                >
                  {product.name}
                </td>
                <td
                  className="text-sm pb-3 pt-3"
                  style={{ color: getColor("text") }}
                >
                  {formatCurrency(product.price)}
                </td>
                <td
                  className="text-sm pb-3 pt-3"
                  style={{ color: getColor("text") }}
                >
                  {product.quantity}
                </td>
                <td
                  className="text-sm pb-3 pt-3"
                  style={{ color: getColor("text") }}
                >
                  {formatCurrency(product.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
