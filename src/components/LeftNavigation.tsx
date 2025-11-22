import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { ThemedIcon } from "./ThemedIcon";
import { LEFT_NAVIGATION } from "../utils/data";
import { IconMap, type IconKey } from "../utils/icons";

import byeWindLogo from "../assets/ByeWind.svg";
import downArrow from "../assets/icons/ArrowLineDown.svg";
import rightArrow from "../assets/icons/ArrowLineRight.svg";

type NavItem = {
  label: string;
  path?: string;
  icon?: boolean;
  children?: NavItem[];
};

interface LeftNavigationProps {
  isOpen: boolean;
}

export function LeftNavigation({ isOpen }: LeftNavigationProps) {
  const { getColor, getThemeColor } = useTheme();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <aside
      className={`w-[212px] h-screen border-r fixed top-0 z-40 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{
        backgroundColor: getColor("background"),
        color: getColor("text"),
        borderRightColor: getThemeColor("#1C1C1C1A"),
      }}
    >
      <div className="px-[16px] py-[20px]">
        <div className="flex items-center gap-2 mb-[16px] p-[4px]">
          <img src={byeWindLogo} alt="ByeWind" />
          <p className="text-sm">ByeWind</p>
        </div>

        <div className="mb-[16px] p-[4px]">
          <div className="flex items-center gap-3 mb-[4px]">
            <div
              className="py-1 px-1 text-sm cursor-pointer"
              style={{ color: getThemeColor("#1C1C1C66") }}
            >
              Favorites
            </div>

            <div
              className="py-1 px-1 text-sm cursor-pointer"
              style={{ color: getThemeColor("#1C1C1C33") }}
            >
              Recently
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center py-1 px-2 gap-1 cursor-pointer">
              <div className="w-[16px] h-[16px] flex items-center justify-center">
                <div
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ backgroundColor: getThemeColor("#1C1C1C33") }}
                ></div>
              </div>
              <p className="text-sm">Overview</p>
            </div>

            <div className="flex items-center py-1 px-2 gap-1 cursor-pointer mb-[8px]">
              <div className="w-[16px] h-[16px] flex items-center justify-center">
                <div
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ backgroundColor: getThemeColor("#1C1C1C33") }}
                ></div>
              </div>
              <p className="text-sm">Projects</p>
            </div>
          </div>
        </div>

        {LEFT_NAVIGATION.sections.map((section) => (
          <div key={section.title} className="mb-[16px]">
            <p className="text-sm text-gray-400 py-[4px] px-[12px]">
              {section.title}
            </p>

            <nav className="space-y-1">
              {section.items.map((item) => (
                <NavItemRow
                  key={item.label}
                  item={item}
                  isSelected={selectedItem === item.label}
                  onSelect={() => setSelectedItem(item.label)}
                />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

function NavItemRow({
  item,
  isSelected,
  onSelect,
}: {
  item: NavItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const icon = item.icon ? IconMap[item.label as IconKey] : undefined;
  const [expanded, setExpanded] = useState(false);
  const { getColor, getThemeColor, theme } = useTheme();
  const hoverBgColor =
    theme === "dark" ? "#2A2A2A" : getThemeColor("#1C1C1C0D");
  const lineColor = theme === "dark" ? getColor("blue") : getColor("black");

  if (item.children) {
    return (
      <div>
        <div
          className="w-full flex items-center justify-between rounded-[8px] transition-colors cursor-pointer pt-1 px-2 pb-1 group"
          style={
            {
              backgroundColor: isSelected ? hoverBgColor : "transparent",
              "--hover-bg": hoverBgColor,
            } as React.CSSProperties & { "--hover-bg": string }
          }
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = hoverBgColor;
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
          onClick={() => {
            setExpanded(!expanded);
            onSelect();
          }}
        >
          <div className="flex items-center gap-[4px] relative">
            <div
              className={`w-[4px] h-[16px] rounded-full absolute top-1/2 -translate-y-1/2 left-[-9px] transition-opacity ${
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              style={{ background: lineColor }}
            ></div>
            {expanded ? (
              <ThemedIcon
                src={downArrow}
                alt="Open"
                color={getColor("text")}
                className="w-4 h-4"
              />
            ) : (
              <ThemedIcon
                src={rightArrow}
                alt="Close"
                color={getColor("text")}
                className="w-4 h-4"
              />
            )}
            {icon && (
              <ThemedIcon
                src={icon}
                alt={item.label}
                color={getColor("text")}
              />
            )}
            <span className="text-sm">{item.label}</span>
          </div>
        </div>

        {expanded && (
          <div className="ml-13 mt-1 space-y-1">
            {item.children.map((child) => (
              <div
                key={child.label}
                className="block py-1 text-sm rounded-[10px] cursor-pointer"
              >
                {child.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-[4px] rounded-[10px] cursor-pointer transition-colors px-[12px] py-[4px] group relative"
      style={{
        backgroundColor: isSelected ? hoverBgColor : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = hoverBgColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
      onClick={onSelect}
    >
      <div
        className={`w-[4px] h-[16px] rounded-full absolute top-1/2 -translate-y-1/2 left-0 transition-opacity ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{ background: lineColor }}
      ></div>
      <div className="w-3 h-3"></div>
      {icon && (
        <ThemedIcon src={icon} alt={item.label} color={getColor("text")} />
      )}
      <span className="text-sm">{item.label}</span>
    </div>
  );
}
