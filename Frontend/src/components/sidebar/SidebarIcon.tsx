import React, { JSX } from "react";
import {
    People,
    Assignment,
    Timeline,
    ListAlt,
    Home,
    Person
} from "@mui/icons-material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";

type SidebarIconProps = {
    icon: string;
};

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon }) => {
    const icons: { [key: string]: JSX.Element } = {
        Home: <Home className="text-black" />,
        Profile: <Person className="text-black" />,
        Users: <People className="text-black" />,
        Projects: <PermMediaIcon className="text-black" />,
        Tasks: <Assignment className="text-black" />,
        Sprints: <Timeline className="text-black" />,
        Backlog: <ListAlt className="text-black" />,
        Board: <IntegrationInstructionsOutlinedIcon className="text-black" />,
    };

    return icons[icon] || null;
};

export default SidebarIcon;
