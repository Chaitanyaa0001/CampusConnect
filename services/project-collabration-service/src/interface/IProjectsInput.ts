export type ProjectStatus =
    | "IDEA_VALIDATION"
    | "BUILDING_MVP"
    | "COMPLETED";


export interface ICreateProjectInput {
    title: string;
    description?: string;
    status?: ProjectStatus;
    isOpen?: boolean;
    teamSize: number;
    membersNeeded: number;
    techStack: string[];
    requiredSkills: string[];
}

export interface IGetProjectFilters {
    search?: string;
    status?: ProjectStatus;
    page?: number;
    limit?: number;
}