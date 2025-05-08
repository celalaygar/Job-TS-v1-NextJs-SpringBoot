// components/CreateProjectDialog.tsx
import { Dialog, TextField, LinearProgress } from "@mui/material";
import { ProjectCreateForm } from "@/data/project";

type CreateProjectDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: { name: string; description: string }) => Promise<void>;
  form: ProjectCreateForm;
  errors: { name: string; description: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  loading: boolean;
};

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  errors,
  onChange,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="p-6 w-full max-w-full mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Project</h1>
        <div className="space-y-4">
          <TextField
            label="Project Name"
            name="name"
            value={form.name}
            fullWidth
            margin="normal"
            onChange={onChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            fullWidth
            margin="normal"
            onChange={onChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
            multiline
            minRows={3}
          />

          {/* Buttons */}
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
              onClick={() => onSubmit(form)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
      {loading && <LinearProgress />}
    </Dialog>
  );
};

export default CreateProjectDialog;
