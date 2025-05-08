"use client";

import { CreateTaskError, Task, TaskForm } from "@/data/tasks";
import { useCallback, useEffect, useState } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Alert,
    Checkbox,
    FormControlLabel,
    Divider,
    SelectChangeEvent,
    FormHelperText,
    TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { ProjectUser } from "@/data/project";

type CreateTaskFormProps = {
    projectId: string | undefined;
    task: TaskForm;
    loading: boolean;
    onSubmit: (updatedTask: Task) => void;
    onClose: () => void;
};

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
    projectId,
    loading,
    task,
    onSubmit,
    onClose,
}) => {
    const [priority, setPriority] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [form, setForm] = useState<Task>({ ...task as Task });
    const [loadingForm, setLoadingForm] = useState(false);
    const [users, setUsers] = useState<ProjectUser[]>([]);
    const [assignToMe, setAssignToMe] = useState(false);
    const [addToActiveSprint, setAddToActiveSprint] = useState(true);
    const [addToBackLog, setAddToBackLog] = useState(false);
    const { data: session } = useSession();

    const [errors, setErrors] = useState<CreateTaskError>(
        { title: null, description: null, priority: null, type: null, assigned: null });

    const fetchUsers = useCallback(async () => {
        if (!projectId) return;
        setLoadingForm(true);
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
            console.log("Error loading users" + err);
        }
        setLoadingForm(false);
    }, [projectId]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        const fetchTypes = async () => {
            const res = await fetch("/api/jobs/enums?type=task-types");
            if (!res.ok) {
                throw new Error("Failed to fetch task types");
            }
            const data = await res.json();
            setTypes(data);
        };
        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchPriority = async () => {
            const res = await fetch("/api/jobs/enums?type=priorities");
            if (!res.ok) {
                throw new Error("Failed to fetch priorities");
            }
            const data = await res.json();
            setPriority(data);
        };
        fetchPriority();
    }, []);

    const onchange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: null,
        });

    };

    const handleAssignToMe = () => {
        setAssignToMe(!assignToMe);
        setForm({
            ...form,
            assigned: !assignToMe ? session?.user?.email : "",
            assignToMe: !assignToMe,
        });
    };

    const validation = async () => {
        console.log(addToBackLog);
        setLoadingForm(true);

        // Basic validation
        const newErrors: CreateTaskError = {
            title: null,
            description: null,
            priority: null,
            type: null,
            assigned: null
        };

        if (!form.title) {
            newErrors.title = "Title is required";
        }
        if (!form.description) {
            newErrors.description = "Description is required";
        }
        if (!form.priority) {
            newErrors.priority = "Priority is required";
        }
        if (!form.type) {
            newErrors.type = "Type is required";
        }

        if (!assignToMe && !form.assigned) {
            newErrors.assigned = "Assignee is required";
        }

        const hasErrors = Object.values(newErrors).some((error) => error !== null);

        setErrors(newErrors);
        return hasErrors;
    };
    const handleSubmit = async () => {

        if (await validation()) {
            setLoadingForm(false);
            return;
        }

        await onSubmit({
            ...form,
            addToActiveSprint: addToActiveSprint ? true : false,
            addToBackLog: !addToActiveSprint ? true : false,
        });
        setLoadingForm(false);
    };

    return (
        <div className="bg-white p-2 max-w-lg mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Create Task</h3>
            {!projectId ? (
                <Alert severity="error">Please select a project</Alert>
            ) :
                (loading || loadingForm) ? (
                    <div className="w-96"> <LinearProgress /> </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            <TextField
                                name="title"
                                label="Title"
                                value={form.title}
                                onChange={onchange}
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title}
                            />
                            <TextField
                                name="description"
                                label="Description"
                                value={form.description}
                                onChange={onchange}
                                fullWidth
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description}
                            />

                            <FormControlLabel
                                control={<Checkbox checked={assignToMe} onChange={handleAssignToMe} />}
                                label="Assign to me"
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
                                    value={form.assigned || ""}
                                    label="Assignee"
                                    onChange={onchange}
                                >
                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.email}>
                                            {user.email}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.assigned && <FormHelperText error>{errors.assigned}</FormHelperText>}
                            </FormControl>

                            <FormControlLabel
                                control={<Checkbox checked={addToActiveSprint}
                                    onChange={() => setAddToActiveSprint(!addToActiveSprint)} />}
                                label="Add to Active Sprint"
                            />

                            <FormControlLabel
                                control={<Checkbox checked={!addToActiveSprint} disabled={true}
                                    onChange={() => setAddToBackLog(!addToActiveSprint)} />}
                                label="Add to Backlog"
                            />
                            <Divider />
                            <FormControlLabel
                                control={<span className="ml-4 text-sm text-red-500">
                                    If there is no active sprint, it is assigned to the Backlog.
                                </span>}
                                label=""
                            />
                            <Divider />

                            <FormControl
                                fullWidth margin="normal"
                                size="small">
                                <InputLabel id="priority-label">Priority</InputLabel>
                                <Select
                                    labelId="priority-label"
                                    id="priority"
                                    name="priority"
                                    value={form.priority || ""}
                                    label="Priority"
                                    onChange={onchange}
                                >
                                    {priority.map((p) => (
                                        <MenuItem key={p} value={p}>
                                            {p}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.priority && <FormHelperText error>{errors.priority}</FormHelperText>}
                            </FormControl>

                            <FormControl
                                fullWidth margin="normal"
                                size="small">
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    name="type"
                                    value={form.type || ""}
                                    label="Type"
                                    onChange={onchange}
                                >
                                    {types.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.type && <FormHelperText error>{errors.type}</FormHelperText>}
                            </FormControl>

                            <Divider />

                        </div>

                        {/* Butonlar */}
                        <div className="flex flex-col sm:flex-row justify-end mt-5 gap-2">
                            <button
                                type="button"
                                disabled={loadingForm}
                                onClick={onClose}
                                className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={!projectId || loadingForm}
                                onClick={handleSubmit}
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                            >
                                {loadingForm ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </>
                )}
        </div>
    );
};

export default CreateTaskForm;
