import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceProject {
  projectId: string | undefined;
  projectName: string | undefined;
  projectCode: string | undefined;
  assignedUser: string | undefined;
}

interface ProjectState {
  selectedProject: SliceProject | null;
}

const initialState: ProjectState = {
  selectedProject: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<SliceProject>) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
