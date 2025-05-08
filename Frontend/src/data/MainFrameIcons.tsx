import { SxProps } from "@mui/material";
import { Assignment, Home, ListAlt, People, Person, Timeline } from "@mui/icons-material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import { ReactNode } from "react";


export interface MainFrameIcon {
    title: string;
    titleIcon: ReactNode;
}
interface IconStyleProps {
    className: string;
    sx: SxProps;
}

// Ortak ikon stilleri için obje
const iconStyles: IconStyleProps = {
    className: "text-black",
    sx: { fontSize: 30 },
};


export const mainFrameIcons: Record<string, MainFrameIcon> = {
    dashBoard: {
        title: "Home",
        titleIcon: <Home {...iconStyles} />,
    },
    Home: {
        title: "Home",
        titleIcon: <Home {...iconStyles} />,
    },
    profile: {
        title: "Profile",
        titleIcon: <Person {...iconStyles} />,
    },
    users: {
        title: "Users",
        titleIcon: <People {...iconStyles} />,
    },
    projects: {
        title: "Projects",
        titleIcon: <PermMediaIcon {...iconStyles} />,
    },
    tasks: {
        title: "Tasks",
        titleIcon: <Assignment {...iconStyles} />,
    },
    sprints: {
        title: "Sprints",
        titleIcon: <Timeline {...iconStyles} />,
    },
    backlog: {
        title: "Backlog",
        titleIcon: <ListAlt {...iconStyles} />,
    },
    board: {
        title: "Board",
        titleIcon: <IntegrationInstructionsOutlinedIcon {...iconStyles} />,
    },
};
