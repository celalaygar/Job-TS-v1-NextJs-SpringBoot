"use client";

import { Task } from "@/data/tasks";
import {
  Box,
  Avatar,
  Stack,
  Alert,
  LinearProgress,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TaskCard } from "../tasks/taskCard";
import { ProjectUser } from "@/data/project";

export const TaskStatusMap: Record<string, string> = {
  TO_DO: "TO DO",
  IN_PROGRESS: "IN PROGRESS",
  DONE: "DONE",
  TEST: "TEST",
  DEV: "DEVELOPMENT",
  PROD: "PRODUCTION",
};
export type TaskStatus = keyof typeof TaskStatusMap;

type MainFrameProps = {
  projectId: string | undefined;
};

const BoardMainPage: React.FC<MainFrameProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<ProjectUser[]>([]);

  const handleDragStart = (
    e: React.DragEvent,
    taskId: number,
    sourceColumn: string
  ) => {
    e.dataTransfer.setData("taskId", taskId.toString());
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (sourceColumn !== targetColumn) {
      // tasks dizisinin bir kopyasını oluştur
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          saveChangesStatus(task, targetColumn);

          // Task'in status'ünü güncelle
          return { ...task, status: targetColumn };
        }
        return task;
      });
      // State'i güncelle
      setTasks(updatedTasks as Task[]);
    }
  };

  const saveChangesStatus = async (task: Task, status: string) => {
    const res = await fetch(`/api/jobs/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status }),
    });
    if (!res.ok) {
      throw new Error("Failed to update task status");
    }
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    const fetchPriority = async () => {
      const res = await fetch("/api/jobs/enums?type=task-statuses");
      if (!res.ok) {
        throw new Error("Failed to fetch task statuses");
      }
      const data = await res.json();
      setStatuses(data);
    };
    fetchPriority();
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/tasks/active-sprint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch tasks active sprint");
      }
      const data = await res.json();
      console.log("data");
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Task fetch error:", error);
    }
    setLoading(false);
  }, [projectId]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/projects/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.log(err);
      //setError("Error loading users");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <> <LinearProgress /> </>
  ) : (
    <>
      <Box sx={{ p: 2 }}>
        {/* User List */}
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2 }}>
          <Stack key={"all"} alignItems="center">
            <Avatar sx={{ width: 50, height: 50 }}>
              {"ALL"}
            </Avatar>
            <div className="text-xs">ALL</div>
          </Stack>
          {users.map((user) => (
            <Stack key={user.id} alignItems="center">
              <Avatar sx={{ width: 50, height: 50 }}>
                {(user.firstname + " " + user.lastname)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div className="text-xs">{user.firstname}<br />{user.lastname}</div>
            </Stack>
          ))}
        </Box>

        {/* Task Columns */}
        <div className="flex gap-2 ">
          {statuses &&
            statuses.map((col) => {
              const taskCount = Array.isArray(tasks) && tasks.filter((task) => task.status === col).length;
              return (
                <div
                  key={col}
                  className="flex-1 p-2 bg-gray-100 rounded-md border border-1 border-gray-300 shadow-lg "
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, col)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">
                      {TaskStatusMap[col]}
                    </h3>
                    {taskCount !== 0 && (
                      <h3 className="text-sm font-semibold mb-2 text-gray-600">
                        {taskCount}
                      </h3>
                    )}
                  </div>
                  {Array.isArray(tasks) && tasks.map((task) =>
                    task?.status && task.status === col && (
                      <TaskCard
                        projectId={projectId}
                        fetchTasks={fetchTasks}
                        key={task.id}
                        task={task}
                        handleDragStart={handleDragStart}
                      />
                    )
                  )}
                </div>
              );
            })}
        </div>
      </Box>
    </>
  );
};

export default BoardMainPage;
