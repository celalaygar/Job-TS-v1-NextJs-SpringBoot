"use client";

import React from "react";
import {
    Dialog,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { Sprint, SprintStatuses } from "@/data/sprint";

type SprintUpdateDialogProps = {
    loading: boolean;
    open: boolean;
    onClose: () => void;
    sprint?: Sprint;
    sprintStatuses: SprintStatuses[];
    onChange: (e: SelectChangeEvent<string>) => void;
    onUpdate: () => void;
};

const SprintUpdateDialog: React.FC<SprintUpdateDialogProps> = ({
    loading,
    open,
    onClose,
    sprint,
    sprintStatuses,
    onChange,
    onUpdate,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="p-2 md:p-6">

                <h3 className="text-xl font-bold mb-4 text-center">Update Sprint</h3>
                <div>
                    <p className="text-sm text-gray-500 my-3 text-center md:text-left">
                        If there is a sprint that is active, you cannot update the status of the sprint.
                    </p>
                    <FormControl fullWidth margin="normal" size="small">
                        <InputLabel id="status-label">Sprint Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name="status"
                            label="Sprint Status"
                            value={sprint?.status || ""}
                            onChange={onChange}
                        >
                            {sprintStatuses.map((status) => (
                                <MenuItem key={status.id} value={status.name}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

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
                        onClick={onUpdate}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default SprintUpdateDialog;
