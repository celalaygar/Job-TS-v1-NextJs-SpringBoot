import React, { useState } from "react";
import { Dialog, LinearProgress } from "@mui/material";

type Props = {
    open: boolean;
    onClose: () => void;
    projectId: string | undefined;
    refreshSprints: () => void;
};

const CreateSprintModal: React.FC<Props> = ({ open, onClose, projectId, refreshSprints }) => {
    const [form, setForm] = useState({ name: "", description: "", projectId });
    const [errors, setErrors] = useState({ name: "", description: "" });
    const [loadingForm, setLoadingForm] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        // Kullanıcı yazdıkça hatayı temizle
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const tempErrors = { name: "", description: "" };
        let isValid = true;

        if (!form.name) {
            tempErrors.name = "Sprint Name zorunludur.";
            isValid = false;
        } else if (form.name.length < 3) {
            tempErrors.name = "Sprint Name en az 3 karakter olmalıdır.";
            isValid = false;
        }

        if (!form.description) {
            tempErrors.description = "Description zorunludur.";
            isValid = false;
        } else if (form.description.length < 10) {
            tempErrors.description = "Description en az 10 karakter olmalıdır.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleCreateSprint = async () => {
        if (!validateForm()) return;
        if (!projectId) return;

        setLoadingForm(true);
        try {
            const res = await fetch(`/api/sprints`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to create sprint");

            await res.json();
            refreshSprints();
            onClose();
            setForm({ name: "", description: "", projectId });
        } catch (error) {
            console.error("Sprint oluştururken hata:", error);
        } finally {
            setLoadingForm(false);
        }
    };

    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
            <div className="bg-white p-6 w-full max-w-full mx-auto rounded-lg shadow-lg ">
                <h3 className="text-xl font-bold mb-4 text-center">Create Sprint</h3>

                {loadingForm ? (
                    <LinearProgress />
                ) : (
                    <>
                        <div className="space-y-4">
                            {/* Sprint Name */}
                            <label htmlFor="name" className="text-sm font-semibold">Sprint Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Sprint Name"
                                value={form.name}
                                onChange={onChange}
                                className={`border p-3 w-full rounded-lg focus:ring-2 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                            {/* Description */}
                            <label htmlFor="description" className="text-sm font-semibold">Description</label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={onChange}
                                className={`border p-3 w-full rounded-lg focus:ring-2 focus:outline-none min-h-[120px] ${errors.description ? "border-red-500" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
                                disabled={loadingForm}
                                onClick={handleCreateSprint}
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                            >
                                {loadingForm ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Dialog>
    );
};

export default CreateSprintModal;
