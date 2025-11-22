import { useState, memo } from "react";
import { useTheme } from "../hooks/useTheme";
import { ThemedIcon } from "./ThemedIcon";
import { ORDER_DATA } from "../utils/data";
import searchIcon from "../assets/icons/Search.svg";
import addIcon from "../assets/icons/Add.svg";
import filterIcon from "../assets/icons/FunnelSimple.svg";
import arrowDownUpIcon from "../assets/icons/ArrowsDownUp.svg";
import addressIcon from "../assets/icons/ClipboardText.svg";
import calendarIcon from "../assets/icons/CalendarBlank.svg";
import arrowLeftIcon from "../assets/icons/ArrowLineLeft.svg";
import arrowRightIcon from "../assets/icons/ArrowLineRightBlack.svg";

type OrderStatus =
  | "In Progress"
  | "Complete"
  | "Pending"
  | "Approved"
  | "Rejected";

const statusColors: Record<OrderStatus, string> = {
  "In Progress": "#3B82F6",
  Complete: "#10B981",
  Pending: "#60A5FA",
  Approved: "#F59E0B",
  Rejected: "#6B7280",
};

const ITEMS_PER_PAGE = 10;
const TABLE_MIN_WIDTH = 900;

const TABLE_HEADERS = [
  "Order ID",
  "User",
  "Project",
  "Address",
  "Date",
  "Status",
] as const;

interface OrderRowProps {
  order: (typeof ORDER_DATA)[0];
  isSelected: boolean;
  onToggleSelect: (orderId: string) => void;
  textColor: string;
  borderColor: string;
}

const OrderRow = memo(
  ({
    order,
    isSelected,
    onToggleSelect,
    textColor,
    borderColor,
    index,
    hoverBgColor,
  }: OrderRowProps & { index?: number; hoverBgColor: string }) => (
    <tr
      className="group transition-all duration-300 animate-slide-in-row"
      style={{
        borderBottom: `1px solid ${borderColor}`,
        animationDelay: `${(index || 0) * 0.05}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverBgColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <td className="py-3 px-4">
        <CustomCheckbox
          checked={isSelected}
          onChange={() => onToggleSelect(order.id)}
          className={`${
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
      </td>
      <td className="py-3 px-4 text-xs" style={{ color: textColor }}>
        {order.id}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <img
            src={order.user.avatar}
            alt={order.user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xs" style={{ color: textColor }}>
            {order.user.name}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-xs" style={{ color: textColor }}>
        {order.project}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <span className="text-xs" style={{ color: textColor }}>
            {order.address}
          </span>
          {order.addressIcon && (
            <ThemedIcon src={addressIcon} alt="Address" color={textColor} />
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <ThemedIcon
            src={calendarIcon}
            alt="Calendar"
            color={textColor}
            className="w-4 h-4"
          />
          <span className="text-xs" style={{ color: textColor }}>
            {order.date}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColors[order.status] }}
          />
          <span className="text-xs" style={{ color: textColor }}>
            {order.status}
          </span>
        </div>
      </td>
    </tr>
  )
);

OrderRow.displayName = "OrderRow";

interface CustomCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  className?: string;
}

const CustomCheckbox = memo(
  ({
    checked,
    indeterminate,
    onChange,
    className = "",
  }: CustomCheckboxProps) => {
    const { getThemeColor, getColor, theme } = useTheme();
    const backgroundColor =
      checked || indeterminate
        ? theme === "dark"
          ? getColor("blue")
          : getThemeColor("#1C1C1C")
        : "transparent";
    const tickColor = theme === "dark" ? "#1C1C1C" : "white";

    return (
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center transition-opacity ${className}`}
        style={{
          borderColor: getThemeColor("#1C1C1C33"),
          backgroundColor,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {(checked || indeterminate) && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {indeterminate ? (
              <line
                x1="2"
                y1="5"
                x2="8"
                y2="5"
                stroke={tickColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5L4 7L8 3"
                stroke={tickColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        )}
      </div>
    );
  }
);

CustomCheckbox.displayName = "CustomCheckbox";

export function OrderList() {
  const { getColor, getThemeColor, theme } = useTheme();
  const hoverBgColor =
    theme === "dark" ? getThemeColor("#1C1C1C0D") : getColor("light");
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = ORDER_DATA.filter((order) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) ||
      order.user.name.toLowerCase().includes(query) ||
      order.project.toLowerCase().includes(query) ||
      order.address.toLowerCase().includes(query) ||
      order.date.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query)
    );
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const comparison = a.user.name.localeCompare(b.user.name);
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSortByName = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const isAllSelected =
    sortedOrders.length > 0 && selectedOrders.size === sortedOrders.length;

  const isIndeterminate =
    selectedOrders.size > 0 && selectedOrders.size < sortedOrders.length;

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(orderId)) {
        newSelected.delete(orderId);
      } else {
        newSelected.add(orderId);
      }
      return newSelected;
    });
  };

  const toggleSelectAll = () => {
    setSelectedOrders((prev) => {
      if (prev.size === sortedOrders.length) {
        return new Set();
      }
      return new Set(sortedOrders.map((order) => order.id));
    });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div
      className="w-full h-full p-6 animate-fade-in"
      style={{ backgroundColor: getColor("background") }}
    >
      <p className="text-sm font-semibold" style={{ color: getColor("text") }}>
        Order List
      </p>

      <div
        className="flex items-center justify-between my-6 rounded-[8px] p-2"
        style={{ backgroundColor: getColor("light") }}
      >
        <div className="flex items-center gap-4">
          <ThemedIcon
            src={addIcon}
            alt="Add"
            color={getColor("text")}
            className="cursor-pointer"
          />
          <ThemedIcon
            src={filterIcon}
            alt="Filter"
            color={getColor("text")}
            className="cursor-pointer"
          />
          <ThemedIcon
            src={arrowDownUpIcon}
            alt="Arrow Down Up"
            color={getColor("text")}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleSortByName}
          />
        </div>

        <div
          className="flex items-center gap-2 rounded-[8px] px-2 py-1 h-7"
          style={{
            backgroundColor: getThemeColor("#1C1C1C0D"),
            borderColor: getThemeColor("#1C1C1C33"),
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <ThemedIcon
            src={searchIcon}
            alt="Search"
            color={getColor("text")}
            className="w-4 h-4"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="text-sm bg-transparent border-none outline-none flex-1 placeholder:opacity-60"
            style={{
              color: getColor("text"),
            }}
          />
        </div>
      </div>

      <div className="rounded-lg overflow-hidden animate-fade-in-scale">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: TABLE_MIN_WIDTH }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${getThemeColor("#1C1C1C33")}`,
                }}
              >
                <th className="text-left py-3 px-4">
                  <CustomCheckbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={toggleSelectAll}
                  />
                </th>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="text-left py-3 px-4 text-xs font-normal"
                    style={{ color: getThemeColor("#1C1C1C66") }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  isSelected={selectedOrders.has(order.id)}
                  onToggleSelect={toggleSelectOrder}
                  textColor={getColor("text")}
                  borderColor={getThemeColor("#1C1C1C1A")}
                  index={index}
                  hoverBgColor={hoverBgColor}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 pb-4 rounded-[8px]">
        <div
          onClick={handlePrevPage}
          className="py-1 px-2 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ThemedIcon
            src={arrowLeftIcon}
            alt="Arrow Left"
            color={getColor("text")}
          />
        </div>
        {pageNumbers.map((page) => (
          <div
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`py-1 px-2 flex items-center justify-center rounded-lg transition-all duration-200 text-sm cursor-pointer hover:scale-110`}
            style={{
              backgroundColor:
                currentPage === page
                  ? getThemeColor("#1C1C1C0D")
                  : "transparent",
              color: getColor("text"),
            }}
            onMouseEnter={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.backgroundColor =
                  getThemeColor("#1C1C1C0D");
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {page}
          </div>
        ))}
        <div
          onClick={handleNextPage}
          className="py-1 px-2 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ThemedIcon
            src={arrowRightIcon}
            alt="Arrow Right"
            color={getColor("text")}
          />
        </div>
      </div>
    </div>
  );
}
