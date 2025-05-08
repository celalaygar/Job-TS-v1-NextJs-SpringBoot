"use client";

import { Task } from "@/data/tasks";
import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { ProjectUser } from "@/data/project";

type UpdateTaskFormProps = {
  projectId: string | undefined;
  task: Task | null;
  onUpdate: (updatedTask: Task) => void; // Crucial: Add onUpdate prop
  onClose: () => void; // Add onClose prop to close the dialog
};

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  projectId,
  task,
  onUpdate,
  onClose,
}) => {
  const [priority, setPriority] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [users, setUsers] = useState<ProjectUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task | null>(task);
  const [assignToMe, setAssignToMe] = useState(false);
  const { data: session } = useSession();

  const handleChange = (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => prevTask ? { ...prevTask, [name]: value } : null); // State'i güncelle
  };

  const handleUpdate = () => {
    if (updatedTask) {
      onUpdate(updatedTask); // Call the onUpdate function passed from TaskCard
    }
    onClose(); // Close the dialog after update
  };

  useEffect(() => {
    const fetchData = async (
      url: string,
      setData: React.Dispatch<React.SetStateAction<string[] | []>>
    ) => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData("/api/jobs/enums?type=task-types", setTypes);
    fetchData("/api/jobs/enums?type=priorities", setPriority);
    fetchData("/api/jobs/enums?type=task-statuses", setStatuses);
  }, [updatedTask?.id]);


  const fetchUsers = useCallback(async () => {
    if (!projectId) return;
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
      setUsers(data);
    } catch (err) {
      console.log(err);
      console.log("Error loading users");
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAssignToMe = () => {
    setAssignToMe(!assignToMe);
    setUpdatedTask((prevTask) => prevTask ? {
      ...prevTask,
      assigned: !assignToMe ? session?.user?.email : "",
      assignToMe: !assignToMe,
    } : null);

  };
  return (
    <div className="bg-white p-2 w-full ">
      <h3 className="text-xl font-bold my-4 text-center">Update Task</h3>
      {loading ? (
        <> <LinearProgress /> </>
      ) : (
        <>
          <div className="space-y-4 m-5">
            <input
              type="text"
              name="title"
              placeholder="Başlık"
              value={updatedTask?.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
            <textarea
              name="description"
              value={updatedTask?.description}
              placeholder="Açıklaması"
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox checked={assignToMe} onChange={handleAssignToMe} />}
              label="Bana Ata"
            />
            <FormControl
              fullWidth margin="normal"
              size="small"
              disabled={assignToMe}>
              <InputLabel id="assignee-label">Assignee</InputLabel>
              <Select
                labelId="assignee-label"
                id="assigned"
                name="assigned"
                value={updatedTask?.assigned || ""}
                label="Assignee"
                onChange={handleChange}
              >
                {users?.map((user) => (
                  <MenuItem key={user.id} value={user.email}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth margin="normal"
              size="small">
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={updatedTask?.priority}
                label="Priority"
                onChange={handleChange}
              >
                {priority?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth margin="normal"
              size="small">
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={updatedTask?.type}
                label="Type"
                onChange={handleChange}
              >
                {types?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth margin="normal"
              size="small">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={updatedTask?.status}
                label="Status"
                onChange={handleChange}
              >
                {statuses?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row justify-end mt-5 gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleUpdate}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateTaskForm;
