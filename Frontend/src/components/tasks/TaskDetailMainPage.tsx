"use client";

import { Task } from "@/data/tasks";
import { Alert, Button, Dialog, LinearProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import "moment/locale/tr";
import Moment from "../Moment";
import UpdateTaskForm from "./UpdateTaskForm";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MovingTaskDialog from "./MovingTaskDialog";

type MainFrameProps = {
  projectId: string | undefined;
  taskId: string;
};

const TaskDetailMainPage: React.FC<MainFrameProps> = ({ projectId, taskId }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [formComment, setFormComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  const openAssignDialogHandler = () => setOpenAssignDialog(true);
  const closeAssignDialogHandler = async () => {
    setLoading(true);
    await fetchData(`/api/jobs/tasks/${taskId}`, setTask);
    setLoading(false);
    setOpenAssignDialog(false);
  };

  const handleUpdateDialogClose = () => setIsUpdateDialogOpen(false);
  const handleUpdateClick = () => setIsUpdateDialogOpen(true);

  const handleUpdateDialogConfirm = async (updatedTask: Task | null) => {
    setIsUpdateDialogOpen(false);
    try {
      const requestBody = { ...updatedTask, projectId };
      const res = await fetch(`/api/jobs/tasks/${task?.id}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) throw new Error("Failed to update task");
      loadDetail();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const onchangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFormComment(e.target.value);

  const addComment = async () => {
    setDisabled(true);
    try {
      const res = await fetch("/api/jobs/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, comment: formComment }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      setFormComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
      loadDetail();
    }
  };

  const fetchData = async (url: string, setData: React.Dispatch<React.SetStateAction<Task | null>>) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      setData(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = useCallback(async () => {
    setLoading(true);
    await fetchData(`/api/jobs/tasks/${taskId}`, setTask);
    setLoading(false);
  }, [taskId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  return !projectId ? (
    <Alert severity="error">Please select a project</Alert>
  ) : loading ? (
    <LinearProgress />
  ) : (
    <div className="container mx-auto p-4 md:p-2">
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <h1 className="text-lg font-bold">{task?.title}</h1>
        <div className="flex gap-2">
          <Button variant="outlined" onClick={openAssignDialogHandler}>Move</Button>
          <Button variant="outlined" startIcon={<BorderColorIcon />} onClick={handleUpdateClick}>Edit</Button>
        </div>
      </div>

      <div className="border p-4 rounded-lg shadow-md bg-white space-y-4 mt-4">
        <div className="grid md:grid-cols-2 gap-4 p-2">
          <div>
            <h4 className="text-lg font-bold my-2">Task Info</h4>
            <p className="p-1 "><strong>Task No:</strong> {task?.taskNumber}</p>
            <p className="p-1 "><strong>Task Status:</strong> {task?.status}</p>
            <p className="p-1 "><strong>Task Type:</strong> {task?.type}</p>
            <p className="p-1 "><strong>Task Priority:</strong> {task?.priority}</p>
            <p className="p-1 "><strong>Project Name:</strong> {task?.project?.name}</p>
            <p className="p-1 "><strong>Project Code:</strong> {task?.project?.projectCode}</p>
          </div>
          <div className="justify-end text-sm">
            <h4 className="text-lg font-bold my-2">Sprınt Info</h4>
            <p className="p-1 "><strong>Sprınt Name:</strong> {task?.sprint?.name}</p>
            <p className="p-1"><strong>Sprınt Status:</strong> {task?.sprint?.status}</p>
            <p className="p-1 mb-5"><strong>Is Backlog:</strong> {task?.backlog ? "True" : "False"}</p>
            <p className="p-1"><strong>Assigned User:</strong> {task?.assigned}</p>
            <p className="p-1"><strong>Created Date:</strong> <Moment date={task?.createdAt} /></p>
          </div>
        </div>
      </div>

      <div className="border p-4 rounded-lg shadow-md bg-white mt-4 p-4">
        <p className="p-2 whitespace-pre-line text-sm bg-gray-100 p-3 rounded-lg">
          <strong>Description : </strong>{task?.description}</p>
      </div>

      <div className="border p-4 rounded-lg shadow-md bg-white mt-4">
        <h2 className="text-lg font-semibold my-2">Comments</h2>
        {task?.comments?.length ? (
          task.comments.map((comment, index) => (
            <div key={index} className="border border-1 border-gray-400 bg-gray-100 p-3 rounded-lg mt-2 p-2">
              <p className="text-sm font-semibold">{comment.user?.email} - {comment.user?.firstname} {comment.user?.lastname}</p>
              <p className="text-xs text-gray-500"><Moment date={comment.createdAt} /></p>
              <p className="mt-2 text-sm">{comment?.comment}</p>
            </div>
          ))
        ) : (
          <Alert severity="info">No comments yet.</Alert>
        )}
        <textarea className="w-full mt-4 p-2 py-4 border rounded-lg" placeholder="Add a comment..." value={formComment} onChange={onchangeComment}></textarea>
        <button
          className="w-full sm:w-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          disabled={disabled}
          onClick={addComment}>Add Comment</button>
      </div>

      <Dialog open={isUpdateDialogOpen} onClose={handleUpdateDialogClose}>
        <UpdateTaskForm projectId={projectId} task={task} onUpdate={handleUpdateDialogConfirm} onClose={handleUpdateDialogClose} />
      </Dialog>
      <MovingTaskDialog open={openAssignDialog} onClose={closeAssignDialogHandler} selectedTask={task} projectId={projectId!} />
    </div>
  );
};

export default TaskDetailMainPage;