import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { AssignTaskForm, Sprint, Task } from "@/data/tasks";


interface AssignTaskDialogProps {
    open: boolean;
    onClose: () => void;
    projectId: string;
    selectedTask: Task | null;
}

const MovingTaskDialog: React.FC<AssignTaskDialogProps> = ({
    open,
    onClose,
    projectId,
    selectedTask,
}) => {

    const [sprints, setSprints] = useState<Sprint[]>([]);
    const [loading, setLoading] = useState(false);
    const [assignTaskForm, setAssignTaskForm] = useState<AssignTaskForm>();

    const getAssignableSprints = useCallback(async () => {
        if (!projectId) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/sprints/assignable-sprints`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectId }),
            });
            if (!res.ok) throw new Error("Failed to fetch Assignable sprints");
            const data = await res.json();
            setSprints(data.data);
        } catch (error) {
            console.error("Sprint fetch error:", error);
        }
        setLoading(false);
    }, [projectId]);

    useEffect(() => {
        getAssignableSprints();
    }, [getAssignableSprints]);

    const assignTask = async () => {
        if (!assignTaskForm) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/sprints/assign-task`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(assignTaskForm),
            });
            if (!res.ok) throw new Error("Failed to assign task");
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("Assign task error:", error);
        }
        setLoading(false);
        onClose();
    }

    const onchange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>
        | React.ChangeEvent<HTMLInputElement>
        | SelectChangeEvent<string>
    ) => {
        setAssignTaskForm({
            projectId,
            taskId: selectedTask?.id,
            sprintId: assignTaskForm?.sprintId || "",
            addToBacklog: assignTaskForm?.addToBacklog || false,
            [e.target.name as string]: e.target.name === "addToBacklog" && e.target instanceof HTMLInputElement ? e.target.checked : e.target.value,
        });

    }


    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="assign-task-dialog"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="assign-task-dialog">Moving Task</DialogTitle>
            <DialogContent>
                {!projectId ? (
                    <Alert severity="error">Please select a project</Alert>
                ) : loading ? (
                    <div className="w-full">
                        <LinearProgress />
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        <FormControlLabel
                            control={<Checkbox
                                name="addToBacklog"
                                onChange={onchange}
                            />}
                            label="Add to backlog"
                        />
                        <FormControl fullWidth variant="outlined" size="small"
                            sx={{ marginTop: 2 }}>
                            <InputLabel id="sprint-select-label">Sprint</InputLabel>
                            <Select
                                disabled={assignTaskForm?.addToBacklog || false}
                                labelId="sprintId"
                                name="sprintId"
                                id="sprint-select"
                                label="Sprint"
                                value={assignTaskForm?.sprintId || ""}
                                onChange={(e) => onchange(e)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {sprints && sprints.map((sprint) => (
                                    <MenuItem key={sprint.id} value={sprint.id}>
                                        {sprint.name} - {sprint.status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}
            </DialogContent>
            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row justify-end mt-5 gap-2 p-2">
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
                    onClick={assignTask}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                    {loading ? "Moving..." : "Move"}
                </button>
            </div>
        </Dialog>
    );
};

export default MovingTaskDialog;
