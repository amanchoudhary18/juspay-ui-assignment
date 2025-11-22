import { useState, useEffect } from "react";
import "./App.css";
import { LeftNavigation } from "./components/LeftNavigation";
import { RightNavigation } from "./components/RightNavigation";
import { Navbar } from "./components/Navbar";
import { EcommerceMetrics } from "./components/EcommerceMetrics";
import { useTheme } from "./hooks/useTheme";
import { ProjectionBarChart } from "./components/ProjectionBarChart";
import { RevenueLineChart } from "./components/RevenueLineChart";
import { RevenueMap } from "./components/RevenueMap";
import { TopSellingProducts } from "./components/TopSellingProducts";
import SalesDoughnut from "./components/SalesDoughnut";
import { OrderList } from "./components/OrderList";

type View = "dashboard" | "orders";

function App() {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isRightNavOpen, setIsRightNavOpen] = useState(true);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const { getColor, theme } = useTheme();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleToggleLeftNav = () => {
    if (isMobile && isRightNavOpen) {
      setIsRightNavOpen(false);
    }
    setIsLeftNavOpen((prev) => !prev);
  };

  const handleToggleRightNav = () => {
    if (isMobile && isLeftNavOpen) {
      setIsLeftNavOpen(false);
    }
    setIsRightNavOpen((prev) => !prev);
  };

  const showBackdrop = isMobile && (isLeftNavOpen || isRightNavOpen);

  return (
    <div
      key={theme}
      className="min-h-screen"
      style={{
        backgroundColor: getColor("background"),
      }}
    >
      {showBackdrop && (
        <div
          className="fixed inset-0 z-30 transition-opacity duration-500 ease-in-out lg:hidden"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={() => {
            if (isLeftNavOpen) setIsLeftNavOpen(false);
            if (isRightNavOpen) setIsRightNavOpen(false);
          }}
        />
      )}

      <LeftNavigation isOpen={isLeftNavOpen} />
      <Navbar
        isLeftNavOpen={isLeftNavOpen}
        isRightNavOpen={isRightNavOpen}
        onToggleLeftNav={handleToggleLeftNav}
        onToggleRightNav={handleToggleRightNav}
        onHistoryClick={() =>
          setCurrentView(currentView === "dashboard" ? "orders" : "dashboard")
        }
        currentView={currentView}
      />

      <div
        className="fixed top-16 bottom-0 transition-all duration-500 ease-in-out overflow-y-auto p-3 animate-fade-in lg:left-0 lg:right-0"
        style={{
          left: isMobile ? "0px" : isLeftNavOpen ? "212px" : "0px",
          right: isMobile ? "0px" : isRightNavOpen ? "280px" : "0px",
          animationDelay: "0s",
          opacity: 0,
          backgroundColor: getColor("background"),
        }}
      >
        {currentView === "dashboard" ? (
          <div className="p-4">
            <p
              className="text-sm font-semibold mb-4 px-2 py-1"
              style={{ color: getColor("text") }}
            >
              eCommerce
            </p>

            <div className="flex flex-wrap items-stretch gap-6">
              <div className="min-w-[350px] flex-1 flex flex-col">
                <EcommerceMetrics />
              </div>

              <div className="min-w-[350px] flex-1 flex flex-col">
                <ProjectionBarChart />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-stretch gap-6">
              <div className="min-w-[350px] flex-3">
                <RevenueLineChart />
              </div>

              <div className="min-w-[350px] flex-1">
                <RevenueMap />
              </div>

              <div className="min-w-[350px] flex-3">
                <TopSellingProducts />
              </div>

              <div className="min-w-[350px] flex-1">
                <SalesDoughnut />
              </div>
            </div>
          </div>
        ) : (
          <OrderList />
        )}
      </div>
      <RightNavigation isOpen={isRightNavOpen} />
    </div>
  );
}

export default App;
