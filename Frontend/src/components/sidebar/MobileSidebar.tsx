"use client";

import React, { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarLink, sidebarLinks } from "@/data/sidebarLinks";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarIcon from "./SidebarIcon";

type MainFrameProps = {
  bgColor: string;
};

const MobileSidebar: React.FC<MainFrameProps> = ({ bgColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getSidebarLinkByHref = (href: string) => {
    return sidebarLinks.find((link) => link.href === href);
  };

  const detectActiveKey = useCallback(() => {
    const link: SidebarLink | undefined = getSidebarLinkByHref(currentPath);
    return link ? link.activeKey : "home";
  }, [currentPath]);

  const [activeMenu, setActiveMenu] = useState<string>(detectActiveKey());

  const setSelectedActiveMenu = (activeKey: string) => {
    setActiveMenu(activeKey);
  };

  useEffect(() => {
    setActiveMenu(detectActiveKey());
  }, [detectActiveKey]);

  return (
    <div
      style={{ backgroundColor: bgColor || "#fffffe", color: "#000000" }}
      className={`cursor-pointer w-full p-2 flex flex-col justify-center ${bgColor} shadow-lg`}
      onClick={toggleSidebar}
    >
      <div style={{ backgroundColor: bgColor || "#fffffe", color: "#000000" }} className="">
        <MenuIcon />
      </div>

      {/* Menü İçeriği */}
      <div className={`overflow-hidden transition-max-height duration-300 ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="flex flex-col p-2 justify-center">
          {sidebarLinks.map((link: SidebarLink) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setSelectedActiveMenu(link.activeKey)}
              className={`flex items-center justify-center h-full gap-3 py-2 px-3 rounded transition-all hover:bg-sky-500/35 ${link.activeKey === activeMenu ? "bg-sky-500/20" : ""
                }`}
            >
              <SidebarIcon icon={link.icon} />
              <span className="text-black font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
