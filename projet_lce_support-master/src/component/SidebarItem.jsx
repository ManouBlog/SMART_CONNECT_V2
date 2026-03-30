import { NavLink } from "react-router-dom";

export default function SidebarItem({
  icon: Icon,
  label,
  to,
  href,
  onClick,
  badgeCount, // ✅ NOUVEAU : props pour le badge
}) {
  const baseClass =
    "group flex items-center p-2 rounded-xl transition-colors duration-200 relative"; // ✅ relative ajouté

  return (
    <li className="relative"> {/* ✅ relative sur li pour positionner le badge */}
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-[#E27B1B] text-white"
                : "text-black hover:bg-[#F5F5F5]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`mr-2 ${
                  isActive
                    ? "bg-white w-6 h-6 flex justify-center items-center rounded-full"
                    : ""
                }`}
              >
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-[#E27B1B]"
                      : "text-black group-hover:text-[#E27B1B]"
                  }
                />
              </span>
              {label}
              
              {/* ✅ BADGE EN POSITION ABSOLUE */}
              {badgeCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold 
                           rounded-full w-5 h-5 flex items-center justify-center 
                           shadow-lg border-2 border-white z-10"
                >
                  {badgeCount > 99 ? '99+' : badgeCount}
                </span>
              )}
            </>
          )}
        </NavLink>
      ) : (
        <a
          href={href || "#"}
          onClick={onClick}
          className={`${baseClass} text-black hover:bg-[#F5F5F5]`}
        >
          <span className="mr-2">
            <Icon
              size={18}
              className="text-black group-hover:text-[#E27B1B]"
            />
          </span>
          {label}
          
          {/* ✅ BADGE pour lien externe aussi */}
          {badgeCount > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold 
                       rounded-full w-5 h-5 flex items-center justify-center 
                       shadow-lg border-2 border-white z-10"
            >
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </a>
      )}
    </li>
  );
}
