"use client";

import React from "react";
import Sidebar from "./sidebar/Sidebar";
import MobileSidebar from "./sidebar/MobileSidebar";
import TopMenu from "./topmenu/TopMenu";

const themeColor = {
    mainColor: "bg-[#eaf8fa]",
    childrenColor: "bg-white",
    topmenuColor: "bg-[#fcfdfe]",
    sidebarColor: "bg-[#fcfdfe]",
};

type MainFrameProps = {
    title: string;
    children: React.ReactNode;
    titleIcon: React.ReactNode;
};

const MainFrameComponent: React.FC<MainFrameProps> = ({
    title,
    titleIcon,
    children,
}) => {
    return (
        <div className={`min-h-screen ${themeColor.mainColor} text-black`}>
            <TopMenu bgColor={themeColor.topmenuColor} />

            {/* Mobile Sidebar */}
            <div
                className={`my-2 block lg:hidden md:hidden text-center font-bold ${themeColor.childrenColor}`}
            >
                <MobileSidebar bgColor={themeColor.sidebarColor} />
            </div>

            <div className="flex min-h-screen">
                {/* Sidebar for larger screens */}
                <div className={`hidden lg:block md:block mt-4 ${themeColor.sidebarColor}`}>
                    <div className={`hidden md:block p-2 ${themeColor.sidebarColor}`}>
                        <Sidebar bgColor={themeColor.sidebarColor} />
                    </div>
                </div>

                <div className="flex-grow p-2 min-h-screen">
                    {/* Title and Icon Section - Responsive Positioning */}
                    <div
                        className="flex flex-row gap-2 items-center px-2 py-2 my-2 font-bold text-lg text-black 
            lg:justify-start md:justify-start justify-center"
                    >
                        <div>{titleIcon && titleIcon}</div>
                        <div>{title && title}</div>
                    </div>

                    <div className={`p-2 min-h-screen ${themeColor.childrenColor}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainFrameComponent;
