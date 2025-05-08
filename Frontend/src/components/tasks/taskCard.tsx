import { Task } from "@/data/tasks";
import React, { JSX, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Drawer,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { MoreVertOutlined } from "@mui/icons-material";
import { BugReport, Store, Star } from "@mui/icons-material"; // Örnek ikonlar
import UpdateTaskForm from "./UpdateTaskForm";

export const PriorityColors: Record<string, string> = {
  HIGHEST: "bg-red-600 text-white", // Kırmızı
  HIGH: "bg-red-400 text-white", // Turuncu
  MEDIUM: "bg-yellow-400 text-gray", // Sarı
  LOW: "bg-blue-500 text-white", // Mavi
  LOWEST: "bg-blue-200 text-gray", // Gri
};

export const TaskTypeColors: Record<string, string> = {
  STORY: "bg-green-500 text-white", // Mavi
  FEATURE: "bg-blue-500 text-white", // Yeşil
  BUG: "bg-red-500 text-white", // Kırmızı
};

export const TaskTypeIcons: Record<string, JSX.Element> = {
  STORY: <Store fontSize="small" style={{ fontSize: "18px" }} />, // İkon component'i eklendi
  FEATURE: <Star fontSize="small" style={{ fontSize: "18px" }} />, // İkon component'i eklendi
  BUG: <BugReport fontSize="small" style={{ fontSize: "18px" }} />, // İkon component'i eklendi
};

type TaskCardProps = {
  projectId: string | undefined;
  task: Task;
  fetchTasks: (
  ) => void;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    taskId: number,
    status: string
  ) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  projectId,
  task,
  fetchTasks,
  handleDragStart,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  const handleUpdateClick = () => {
    setTaskToUpdate(task); // Set the task to be updated
    handleMenuClose();
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
    setTaskToUpdate(null); // Reset taskToUpdate when the dialog is closed
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShowClick = () => {
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleUpdateDialogConfirm = async (updatedTask: Task | null) => {
    setIsUpdateDialogOpen(false);
    try {
      const requestBody = { ...updatedTask, projectId: updatedTask?.project.id }
      const res = await fetch(`/api/jobs/tasks/${updatedTask?.id} `, {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      fetchTasks()
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className="p-3 bg-white rounded-lg shadow-lg min-h-[150px] mb-2 cursor-grab relative flex flex-col border border-gray-400 border-dashed"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id, task.status)}
    >
      <div className="absolute top-1 right-0">
        <Tooltip title="Options">
          <IconButton onClick={handleMenuOpen}>
            <MoreVertOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleUpdateClick}>Update</MenuItem>
          <MenuItem onClick={handleShowClick}>
            <Link href={`/tasks/${task.id}`}>
              <button className="">İncele</button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </div>

      {task.comments && task.comments.length > 0 && (
        <Tooltip title={task?.comments?.length + " comments"}>
          <div className="absolute bottom-0 right-0 flex items-center p-2">
            <ChatBubbleOutlineIcon fontSize="small" className="text-gray-500" />
            <span className="text-gray-500 text-sm ml-1">
              {task.comments.length}
            </span>
          </div>
        </Tooltip>
      )}

      <div className="absolute top-2 left-2 flex p-1">
        <span
          className={`px-2.5 py-0.5 rounded font-semibold ${PriorityColors[task.priority?.toUpperCase()]}`}
          style={{ fontSize: "10px" }}
        >
          • {task.priority}
        </span>
      </div>

      <Tooltip title={task.type}>
        <div className="absolute bottom-0 left-0 flex items-center p-2">
          <div
            className={`p-1 rounded mr-1 items-center justify-center flex ${TaskTypeColors[task.type?.toUpperCase()]}`}
          >
            {TaskTypeIcons[task.type?.toUpperCase()]}
          </div>
          <span className="ml-1 text-black text-xs">{task.taskNumber}</span>
        </div>
      </Tooltip>

      <Tooltip title={task.title}>
        <div className="mt-8">
          <h3 className="text-sm">{task.title.slice(0, 15)}</h3>
          <p className="text-xs text-gray-500 mt-1">{task.description.slice(0, 10)}</p>
        </div>
      </Tooltip>

      <Drawer
        anchor="right"
        open={isUpdateDialogOpen}
        onClose={handleUpdateDialogClose}
        sx={{ width: "40vw", "& .MuiDrawer-paper": { width: "40vw" } }}
      >
        <>
          <UpdateTaskForm
            projectId={projectId}
            task={taskToUpdate}
            onUpdate={handleUpdateDialogConfirm}
            onClose={handleUpdateDialogClose}
          />
        </>
      </Drawer>

      <Dialog fullWidth maxWidth="sm"
        open={isDeleteDialogOpen}
        onClose={handleCancelDelete}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
