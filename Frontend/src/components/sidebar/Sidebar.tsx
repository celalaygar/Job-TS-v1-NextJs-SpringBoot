"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarLink, sidebarLinks } from "@/data/sidebarLinks";
import SidebarIcon from "./SidebarIcon";

type MainFrameProps = {
  bgColor: string;
};

const Sidebar: React.FC<MainFrameProps> = ({ bgColor }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPath = usePathname();

  const getSidebarLinkByHref = (href: string) => {
    return sidebarLinks.find((link) => link.href === href);
  };

  const detectActiveKey = useCallback(() => {
    const link: SidebarLink | undefined = getSidebarLinkByHref(currentPath);
    return link ? link.activeKey : "home";
  }, [currentPath]);

  const [activeMenu, setActiveMenu] = useState<string>(detectActiveKey());

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const setSelectedActiveMenu = (activeKey: string) => {
    setActiveMenu(activeKey);
  };

  useEffect(() => {
    setActiveMenu(detectActiveKey());
  }, [detectActiveKey]);


  return (
    <div
      className={`sticky top-0  px-2 py-5 ${isCollapsed ? "w-20" : "w-60"}  transition-width duration-150 `}
      style={{
        backgroundColor: bgColor || "#fffffe",
        color: "#000000",
      }}
    >
      <button onClick={toggleSidebar} className="mb-4 ml-2">
        <MenuIcon />
      </button>
      <div className=" flex flex-col">
        {sidebarLinks.map((link: SidebarLink) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setSelectedActiveMenu(link.activeKey)}
            className={`flex items-center gap-3 py-2 px-2 mt-1 rounded transition-all hover:bg-sky-500/35 ${link.activeKey === activeMenu ? "bg-sky-500/20" : ""
              }`}
          >
            <SidebarIcon icon={link.icon} />
            {!isCollapsed && (
              <span className="text-black text-sm font-medium">{link.label}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
