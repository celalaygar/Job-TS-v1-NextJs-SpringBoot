// Define types for priority, status, type, and comments
export type Priority = "Highest" | "High" | "Medium" | "Low" | "Lowest";
export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "Done"
  | "Test"
  | "Dev"
  | "Prod";
export type TaskType = "Story" | "Feature" | "Bug";

export interface Project {
  id: string;
  name: string;
  projectCode: string; // Date string
}

export interface CommentUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdDate: string; // Date string
}
export interface Comment {
  id: number;               // Unique identifier for the comment
  taskId: number;           // Associated task ID
  comment: string;          // Comment text
  createdAt: string;        // Timestamp when the comment was created (ISO format)
  createdBy: string | null; // User who created the comment (nullable)
  updatedAt: string | null; // Timestamp when the comment was last updated (nullable)
  updatedBy: string | null; // User who last updated the comment (nullable)
  user: CommentUser;
}
// Define the Task interface
export interface Task {
  id: number;
  taskNumber: string;
  title: string;
  description: string;
  addToBackLog: boolean | null | undefined;
  addToActiveSprint: boolean | null | undefined;
  assignToMe: boolean | null | undefined; 
  assigned: string | null | undefined; // Assuming this is a string for the assignee's name
  createdAt: string; // Date string
  priority: Priority;
  status: TaskStatus;
  type: TaskType;
  project: Project;
  sprint: Sprint | null;
  backlog: Backlog | null;
  projectId: string;
  comments: Comment[]; // Add comments array
}
// Define the Task interface
export interface CreateTaskError {
  title: string | null | undefined;
  description: string | null | undefined;
  priority: string | null | undefined;
  type: string | null | undefined;
  assigned: string | null | undefined; // Assuming this is a string for the assignee's name
}

export interface AssignTaskForm {
  taskId: string | number | undefined;
  sprintId: string | undefined;
  projectId: string | undefined;
  addToBacklog: boolean | null | undefined;
}
export interface TaskForm {
  title: string;
  description: string;
  priority: Priority | string | null;
  status: TaskStatus | string | null;
  type: TaskType | string | null;
  projectId: string | undefined;
}

export interface Sprint {
  id: number;
  name: string;
  sprintCode: string;
  startDate: string;
  endDate: string;
  status: string;
  projectId: string;
}

export interface Backlog {
  id: number;
  name: string;
  backlogCode: string;
  status: string;
  projectId: string;
}

export const SprintStatusesObj = {
  ACTIVE: "ACTIVE",
  PLANNED: "PLANNED",
  COMPLETED: "COMPLETED",
};

