import { Task } from "./tasks";

// Define types for priority, status, type, and comments
export type Priority = 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done' | 'Test' | 'Dev' | 'Prod';
export type TaskType = 'Story' | 'Feature' | 'Bug';


export interface Premium {
    startDate: string | undefined;
    endDate: string | undefined;
    premiumType: string | undefined;
}


export interface ProjectUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    createdDate: string;
    premium: Premium;
    role: string;
    image?: string | null;
    birthdate?: string | null;
    birthcity?: string | null;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    projectCode: string;
    createdAt: string;
    createdBy: ProjectUser;
    participatingUsers: ProjectUser[];
    tasks: Task[];
}

export interface ProjectCreateForm {
    name: string;
    description: string;
}