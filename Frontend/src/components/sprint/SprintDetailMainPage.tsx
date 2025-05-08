"use client";

import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { LinearProgress, Alert, SelectChangeEvent } from "@mui/material";
import { Task } from "@/data/tasks";
import { Sprint, SprintStatuses } from "@/data/sprint";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SprintUpdateDialog from "./SprintUpdateDialog";
import Toastyf from "../Toastyf";
import Moment from "../Moment";
import TaskListPage from "../tasks/TaskListPage";

type MainFrameProps = {
  projectId: string | undefined;
  sprintId: string | undefined;
};

const SprintDetailMainPage: React.FC<MainFrameProps> = ({ projectId, sprintId }) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprint, setSprint] = useState<Sprint>();
  const [sprintForm, setSprintForm] = useState<Sprint>();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [sprintStatuses, setSprintStatuses] = useState<SprintStatuses[]>([]);
  const [resultMessage, setResultMessage] = useState<string | undefined>();

  const handleUpdateDialogClose = () => {
    setSprintForm(sprint);
    setIsUpdateDialogOpen(false)
  };
  const handleUpdateClick = () => setIsUpdateDialogOpen(true);

  const handleSprintChange = (e: SelectChangeEvent<string>) => {
    if (sprint) {
      setSprintForm({ ...sprint, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateSprint = async () => {
    if (!projectId || !sprintId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/sprints/changeStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, sprintId, status: sprintForm?.status }),
      });
      if (!res.ok) throw new Error("Failed to update sprint status");
      const data = await res.json();
      console.log(data);
      setResultMessage(data.resultCodeValue);
      fetchTasks();

    } catch (error) {
      console.error("Sprint update error:", error); // Add error handling
    }
    setIsUpdateDialogOpen(false);
    setLoading(false);
  };

  const fetchSprintsStatuses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sprints/statuses`);
      if (!res.ok) throw new Error("Failed to fetch sprint statuses");
      const data = await res.json();
      setSprintStatuses(data.data);
    } catch (error) {
      console.error("Sprint statuses fetch error:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSprintsStatuses();
  }, [fetchSprintsStatuses]);

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/sprints/detail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, sprintId }),
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setSprint(data.data);
      setSprintForm(data.data);
      setTasks(data.data.tasks);
    } catch (error) {
      console.error("Task fetch error:", error);
    }
    setLoading(false);
  }, [projectId, sprintId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <LinearProgress />
  ) : (
    <div className="p-2 sm:p-2 md:p-2 space-y-6">
      {resultMessage && (
        <div>
          <Toastyf
            newVertical="bottom"
            newHorizontal="right"
            message={resultMessage}
            setResultMessage={(newValues) => setResultMessage(newValues as SetStateAction<string | undefined>)}
          />
          <Alert severity="warning" onClose={() => setResultMessage(undefined)}>
            {resultMessage}
          </Alert>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center p-2 mt-4">
        <h6 className="text-lg sm:text-xl md:text-2xl font-bold">Sprint Detail</h6>
        <button className="border p-2 rounded shadow-md" onClick={handleUpdateClick}>
          <BorderColorIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="flex flex-col xl:flex-row mt-5 border border-1border-gray-300 shadow-md xl:items-end p-4 xl:p-4 xl:space-y-0 xl:space-x-6">
        <div className="xl:w-7/12">
          <div className="p-1 text-sm"><strong>Sprint No:</strong> {sprint?.sprintCode}</div>
          <div className="p-1 text-sm"><strong>Sprint Name:</strong> {sprint?.name}</div>
          <div className="p-1 text-sm"><strong>Sprint Status:</strong> {sprint?.status}</div>
        </div>
        <div className="xl:w-5/12 flex flex-col items-start xl:items-end xl:p-2 xl:space-y-0 xl:space-x-6">
          <div className="p-1 text-sm"><strong>Start Date:</strong> <Moment date={sprint?.startDate || null} /></div>
          <div className="p-1 text-sm"><strong>End Date:</strong> <Moment date={sprint?.endDate || null} /></div>
        </div>
      </div>

      <div className="border p-4 rounded-lg shadow-md bg-white mt-4 p-4">
        <p className="p-2 whitespace-pre-line text-sm bg-gray-100 p-3 rounded-lg">
          <strong>Description : </strong>{sprint?.description}</p>
      </div>

      <TaskListPage tasks={tasks} title="My Tasks" />
      <SprintUpdateDialog
        open={isUpdateDialogOpen}
        onClose={handleUpdateDialogClose}
        sprint={sprintForm}
        sprintStatuses={sprintStatuses}
        onChange={handleSprintChange}
        onUpdate={handleUpdateSprint} loading={loading} />
    </div>
  );
};

export default SprintDetailMainPage;
