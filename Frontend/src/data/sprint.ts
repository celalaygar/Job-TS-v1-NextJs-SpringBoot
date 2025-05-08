export interface Sprint {
    id: number;
    name: string;
    status: string;
    sprintCode: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
}

export interface SprintStatuses {
    id: number;
    name: string;
    description: string;
}