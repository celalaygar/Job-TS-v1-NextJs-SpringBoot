

export interface Links {
  dashboard: string;
  home: string;
  login: string;
  register: string;
  profile: string;
  users: string;
  tasks: string;
  projects: string;
  sprints: string;
  backlog: string;
  board: string;
}

export const links: Links = {
  dashboard: "/dashboard",
  home: "/",
  login: "/",
  register: "/register",
  profile: "/profile",
  users: "/users",
  tasks: "/tasks",
  projects: "/projects",
  sprints: "/sprints",
  backlog: "/backlog",
  board: "/board",
};


export interface SidebarLink {
  href: string;
  label: string;
  icon: string;
  loginRequired: boolean;
  activeKey: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    href: links.dashboard,
    label: "Home",
    icon: "Home",
    loginRequired: false,
    activeKey: "home",
  },
  {
    href: links.profile,
    label: "Profile",
    icon: "Profile",
    loginRequired: true,
    activeKey: "profile",
  },
  {
    href: links.users,
    label: "Users",
    icon: "Users",
    loginRequired: true,
    activeKey: "users",
  },
  {
    href: links.projects,
    label: "Projects",
    icon: "Projects",
    loginRequired: true,
    activeKey: "projects",
  },
  {
    href: links.tasks,
    label: "Tasks",
    icon: "Tasks",
    loginRequired: true,
    activeKey: "tasks",
  },
  {
    href: links.sprints,
    label: "Sprints",
    icon: "Sprints",
    loginRequired: true,
    activeKey: "sprints",
  },
  {
    href: links.backlog,
    label: "Backlog",
    icon: "Backlog",
    loginRequired: true,
    activeKey: "backlog",
  },
  {
    href: links.board,
    label: "Board",
    icon: "Board",
    loginRequired: true,
    activeKey: "Bboard",
  },
];
