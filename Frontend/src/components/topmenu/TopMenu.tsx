"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Project } from "@/data/project";
import { G_ACTIVE_KEY, G_PROJECT_ID } from "@/data/constant";
import { setProject } from "@/redux/slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LinearProgress, MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import NotificationMainPopover from "./../notification/NotificationMainPopover";
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import AccountPopover from "./../account/AccountPopover";
import logo from './logo.png'
import Image from "next/image";

type MainFrameProps = {
  bgColor: string;
};

const TopMenu: React.FC<MainFrameProps> = ({ bgColor }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const selectedProject = useSelector((state: RootState) => state.project.selectedProject);
  const [selectedOption, setSelectedOption] = useState<string>(selectedProject?.projectId || "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const projectId = sessionStorage.getItem(G_PROJECT_ID) || "";
      setSelectedOption(projectId);
      dispatch(setProject({ projectId, projectName: "", projectCode: "", assignedUser: "" }));
    }
  }, [dispatch]);


  useEffect(() => {
    setLoading(true);
    const fetchOptionsProjects = async () => {
      try {
        const res = await fetch("/api/jobs/projects");
        if (res.status === 401) {
          await handleLogout(); // 401 hatası alındığında çıkış yap
          return;
        }
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchOptionsProjects();
    setLoading(false);
  }, []);

  const changeProject = (e: SelectChangeEvent<string>) => {
    const selectedProjectId = e.target.value;
    setSelectedOption(selectedProjectId);

    dispatch(setProject({
      projectId: selectedProjectId,
      projectName: undefined,
      projectCode: undefined,
      assignedUser: undefined
    }));

    if (typeof window !== "undefined") {
      sessionStorage.setItem(G_PROJECT_ID, selectedProjectId);
    }
  };

  const handleLogout = async () => {
    try {
      const currentOrigin = window.location.origin;
      sessionStorage.removeItem(G_ACTIVE_KEY);
      sessionStorage.removeItem(G_PROJECT_ID);
      await fetch("/api/auth/logout");
      await signOut({ callbackUrl: currentOrigin + "/" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  return (
    loading ? <LinearProgress /> : (
      <div className={`w-full p-1 py-3 flex items-center justify-between ${bgColor} shadow-lg px-2 border border-1`}
        style={{ backgroundColor: bgColor || "#fffffe", color: "#cecece" }}
      >
        {/* Sol Kısım (Logo + Project Select) */}
        <div className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" width={60} height={80} priority /> {/* Logo buraya eklendi */}
          <FormControl
            fullWidth sx={{ ml: 2, BorderColor: "#cecece" }}
            size="small">
            <InputLabel id="assignee-label">Project</InputLabel>
            <Select
              value={selectedOption}
              onChange={changeProject}
              displayEmpty
              label="Project"
              className="shadow-md hidden md:block"
              sx={{ height: 40, width: 120 }}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Sağ Kısım (Bildirim + Kullanıcı Bilgileri + Logout) */}
        <div className="flex items-center space-x-4">
          <NotificationMainPopover />
          <AccountPopover />
          <button className="border border-1 shadow-md p-2" onClick={handleLogout}>
            <PowerSettingsNewOutlinedIcon className="w-6 h-6 text-black cursor-pointer" />
          </button>
        </div>

      </div>
    )
  );
};

export default TopMenu;
