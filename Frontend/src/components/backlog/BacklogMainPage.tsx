"use client";

import { Task } from "@/data/tasks";
import { Alert, LinearProgress } from "@mui/material";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import MovingTaskDialog from "../tasks/MovingTaskDialog";

type MainFrameProps = {
  projectId: string | undefined;
};


const BacklogMainPage: React.FC<MainFrameProps> = ({ projectId }) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  const openAssignDialogHandler = (task: Task) => {
    setSelectedTask(task);
    setOpenAssignDialog(true);
  };

  const closeAssignDialogHandler = async () => {

    await fetchData(`/api/jobs/backlog/tasks`, setTasks);
    setOpenAssignDialog(false);
  };


  const fetchData = useCallback(async (url: string, setData: React.Dispatch<React.SetStateAction<Task[] | null>>) => {
    if (!projectId) {
      return;
    }
    setData(null);
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const fetchTasks = useCallback(async () => {
    await fetchData(`/api/jobs/backlog/tasks`, setTasks);
  }, [fetchData]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);



  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <LinearProgress />
  ) : (
    <>
      <div className="grid gap-2">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`shadow-md border border-1 rounded-lg p-2 hover:bg-gray-100 transition duration-200 w-full flex flex-col sm:flex-row sm:items-center justify-between my-1`}
            >
              <h5 className="text-md font-bold w-full md:w-1/4"><strong>Task No:</strong>{task.taskNumber}</h5>
              <div className="w-full md:w-2/4 flex flex-col md:flex-row md:justify-between text-sm text-gray-600  mb-2">
                <p>
                  <strong>Title:</strong> {task.title}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
              </div>
              <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-black rounded px-4 py-2 text-sm mb-2 md:mb-0 md:mr-2"
                  onClick={() => openAssignDialogHandler(task)}
                >
                  Move
                </button>
                <button className="bg-blue-500/15  hover:bg-blue-500/25  text-black px-4 py-2 text-sm rounded-md ">
                  <Link href={`/tasks/${task.id}`}>
                    Show
                  </Link>
                </button>
              </div>
            </div>

          ))
        ) : (
          <Alert severity="info">No tasks found</Alert>
        )}
      </div>


      {/* Assign Task Dialog */}
      <MovingTaskDialog
        open={openAssignDialog}
        onClose={closeAssignDialogHandler}
        selectedTask={selectedTask}
        projectId={projectId!}
      />
    </>
  );
};

export default BacklogMainPage;
