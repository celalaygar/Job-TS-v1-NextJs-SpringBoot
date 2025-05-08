"use client";

import { Task, TaskForm } from "@/data/tasks";
import { Alert, Dialog, LinearProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import TaskListPage from "./TaskListPage";

type MainFrameProps = {
  projectId: string | undefined;
};

const TaskMainPage: React.FC<MainFrameProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<TaskForm>({
    description: "",
    priority: "",
    title: "",
    type: "",
    status: null,
    projectId: projectId,
  });
  const [loading, setLoading] = useState(false);


  const onSubmit = async (formTaskData: Task) => {
    try {
      const body = { ...formTaskData, projectId: projectId };
      const res = await fetch("/api/jobs/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to create task");
      }
      const data = await res.json();
      setTasks([...tasks, data]);
      clearForm();
    } catch (error) {
      console.error("Task create error:", error);
    }
    setOpenDialog(false);
  };

  const clearForm = async () => {
    setForm({
      description: "",
      priority: "",
      title: "",
      type: "",
      status: null,
      projectId: projectId,
    });
  };

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/tasks/project/${projectId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Task fetch error:", error);
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);



  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <LinearProgress />
  ) : (
    <div className="p-2">
      <div className="flex  mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpenDialog(true)}
        >
          Create Task
        </button>
      </div>

      {/* Task List */}
      <div className=" ">
        <TaskListPage
          tasks={tasks} title="My Tasks"
        />
      </div>

      {/* Create Task Dialog */}
      <Dialog maxWidth="sm" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        {loading ? (
          <>
            <LinearProgress />
          </>
        ) :
          <>
            <CreateTaskForm
              projectId={projectId}
              loading={loading}
              task={form}
              onSubmit={onSubmit}
              onClose={() => setOpenDialog(false)}
            />
          </>
        }
      </Dialog>
    </div>
  );
};

export default TaskMainPage;
