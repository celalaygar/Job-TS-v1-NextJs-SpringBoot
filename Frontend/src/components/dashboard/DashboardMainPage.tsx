"use client";


import { Task } from "@/data/tasks";
import { Alert, LinearProgress } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import TaskListPage from "../tasks/TaskListPage";

type MainFrameProps = {
  projectId: string | undefined;
};

const DashboardMainPage: React.FC<MainFrameProps> = ({ projectId }) => {
  // const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<Task[]>([]);


  const fetchMyTasks = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/jobs/tasks/my-tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectId: projectId }),
        });
      if (!res.ok) {
        throw new Error("Failed to fetch my tasks");
      }
      const data = await res.json();
      console.log(data);
      setTasks(data.data);
    } catch (error) { console.error("Error fetching my tasks:", error); }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchMyTasks();
  }, [fetchMyTasks]);

  /*
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs/projects");
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);
*/
  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <LinearProgress />
  ) : (
    <>

      <div className="">
        <TaskListPage
          tasks={tasks} title="My Tasks"
        />
      </div>
    </>
  );
};

export default DashboardMainPage;
