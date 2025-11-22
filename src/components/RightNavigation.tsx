import { useTheme } from "../hooks/useTheme";
import { RIGHT_NAVIGATION } from "../utils/data";

import bugIcon from "../assets/icons/BugBeetle.svg";
import userIcon from "../assets/icons/User.svg";
import subscriptionIcon from "../assets/icons/Broadcast.svg";

interface RightNavigationProps {
  isOpen: boolean;
}

export function RightNavigation({ isOpen }: RightNavigationProps) {
  const { getColor, getThemeColor } = useTheme();

  return (
    <aside
      className={`w-[280px] h-screen border-l overflow-y-auto fixed right-0 top-0 z-40 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        backgroundColor: getColor("background"),
        color: getColor("text"),
        borderLeftColor: getThemeColor("#1C1C1C1A"),
      }}
    >
      <div className="p-[20px]">
        <div className="mb-[24px]">
          <p
            className="text-sm font-semibold mb-[8px] py-[8px] px-[4px]"
            style={{ color: getColor("text") }}
          >
            Notifications
          </p>
          <div className="space-y-[8px] mt-5">
            {RIGHT_NAVIGATION.notifications.map((notification) => {
              const icon =
                notification.type === "bug"
                  ? bugIcon
                  : notification.type === "user"
                  ? userIcon
                  : subscriptionIcon;

              return (
                <div
                  key={notification.id}
                  className="flex items-start gap-[8px] cursor-pointer hover:opacity-80 transition-opacity p-[4px]"
                >
                  <div
                    className="p-[4px] rounded-[8px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: getColor("blue") }}
                  >
                    <img src={icon} alt={notification.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm truncate"
                      style={{ color: getColor("text") }}
                    >
                      {notification.message}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: getColor("rejected") }}
                    >
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-[24px]">
          <h2
            className="text-sm font-semibold mb-[12px]"
            style={{ color: getColor("text") }}
          >
            Activities
          </h2>
          <div className="relative">
            <div className="space-y-[8px]">
              {RIGHT_NAVIGATION.activities.map((activity, index) => (
                <div key={activity.id} className="relative">
                  <div className="flex items-start gap-[12px] relative p-[4px]">
                    <div
                      className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 relative z-10"
                      style={{ backgroundColor: getColor("background") }}
                    >
                      <img src={activity.avatar} alt={activity.message} />
                    </div>
                    <div className="flex-1 min-w-0 pt-[4px]">
                      <p
                        className="text-sm truncate"
                        style={{ color: getColor("text") }}
                      >
                        {activity.message}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: getThemeColor("#1C1C1C66") }}
                      >
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                  {index < RIGHT_NAVIGATION.activities.length - 1 && (
                    <div
                      className="absolute left-[19px] top-[40px] w-px h-[16px]"
                      style={{ backgroundColor: getThemeColor("#1C1C1C1A") }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2
            className="text-sm font-semibold mb-[12px]"
            style={{ color: getColor("text") }}
          >
            Contacts
          </h2>
          <div className="space-y-[8px]">
            {RIGHT_NAVIGATION.contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-[12px] cursor-pointer hover:opacity-80 transition-opacity p-[4px]"
              >
                <img src={contact.avatar} alt={contact.id} />
                <p
                  className="text-sm truncate flex-1 min-w-0"
                  style={{ color: getColor("text") }}
                >
                  {contact.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
