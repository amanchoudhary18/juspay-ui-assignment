import { useRef, useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { ThemedIcon } from "./ThemedIcon";
import sidebar from "../assets/icons/Sidebar.svg";
import theme from "../assets/icons/Sun.svg";
import favorites from "../assets/icons/Star.svg";
import history from "../assets/icons/ClockCounterClockwise.svg";
import notification from "../assets/icons/Bell.svg";
import search from "../assets/icons/Search.svg";

interface NavbarProps {
  isLeftNavOpen: boolean;
  isRightNavOpen: boolean;
  onToggleLeftNav: () => void;
  onToggleRightNav: () => void;
  onHistoryClick: () => void;
  currentView?: "dashboard" | "orders";
}

export function Navbar({
  isLeftNavOpen,
  isRightNavOpen,
  onToggleLeftNav,
  onToggleRightNav,
  onHistoryClick,
  currentView = "dashboard",
}: NavbarProps) {
  const { getColor, getThemeColor, toggleTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 h-16 z-50 flex items-center gap-2 px-3 sm:px-4 md:px-6 transition-all duration-500 ease-in-out border-b"
      style={{
        backgroundColor: getColor("background"),
        borderBottomColor: getThemeColor("#1C1C1C1A"),
        borderBottomWidth: "1px",
        left: isMobile ? "0px" : isLeftNavOpen ? "212px" : "0px",
        right: isMobile ? "0px" : isRightNavOpen ? "280px" : "0px",
      }}
    >
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <div onClick={onToggleLeftNav} className="py-2 cursor-pointer">
          <ThemedIcon
            src={sidebar}
            alt="Sidebar"
            color={getColor("text")}
            className="w-4 h-4 sm:w-5 sm:h-5 mt-2 cursor-pointer"
          />
        </div>
        <ThemedIcon
          src={favorites}
          alt="Favorites"
          color={getColor("text")}
          className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block"
        />
      </div>

      <div className="flex items-center gap-0 min-w-0 flex-1 overflow-hidden">
        <p
          className="text-xs sm:text-sm px-1 sm:px-2 py-1 whitespace-nowrap"
          style={{ color: getThemeColor("#1C1C1C66") }}
        >
          Dashboards
        </p>
        <p
          className="text-xs sm:text-sm py-1 whitespace-nowrap"
          style={{ color: getThemeColor("#1C1C1C66") }}
        >
          /
        </p>
        <p
          className="text-xs sm:text-sm px-1 sm:px-2 py-1 cursor-pointer hover:opacity-70 transition-opacity truncate whitespace-nowrap"
          style={{ color: getColor("text") }}
          onClick={currentView === "orders" ? onHistoryClick : undefined}
        >
          {currentView === "orders" ? "Order List" : "Default"}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
        <div
          className="flex items-center rounded-lg px-1 sm:px-2 h-7 gap-1 max-w-[120px] sm:max-w-[140px] md:max-w-[160px]"
          style={{ backgroundColor: getThemeColor("#1C1C1C0D") }}
        >
          <ThemedIcon
            src={search}
            alt="search"
            color={getColor("text")}
            className="w-3 h-3 sm:w-4 sm:h-4 shrink-0"
          />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="text-xs sm:text-[14px] w-full min-w-0 bg-transparent border-none outline-none"
            style={{ color: getThemeColor("#1C1C1C33") }}
          />
          <p
            className="text-xs sm:text-[14px] hidden sm:block shrink-0"
            style={{ color: getThemeColor("#1C1C1C33") }}
          >
            ⌘/
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <ThemedIcon
            src={theme}
            alt="Theme"
            color={getColor("text")}
            className="p-1 w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={toggleTheme}
          />
          <ThemedIcon
            src={history}
            alt="history"
            color={getColor("text")}
            className="p-1 w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={onHistoryClick}
          />
          <ThemedIcon
            src={notification}
            alt="notification"
            color={getColor("text")}
            className="p-1 w-6 h-6 sm:w-7 sm:h-7 hidden sm:block"
          />
          <div onClick={onToggleRightNav} className="p-1 cursor-pointer">
            <ThemedIcon
              src={sidebar}
              alt="Sidebar"
              color={getColor("text")}
              className="w-4 h-4 sm:w-5 sm:h-5 mt-2 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
