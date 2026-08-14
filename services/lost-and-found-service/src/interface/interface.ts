export type LostFoundType = "LOST" | "FOUND";


export interface ICreateLostAndFoundInput {
    itemName: string;
    type: LostFoundType;
    location: string;
    date: Date;
    description?: string;
    tags: string[];
}


export interface IUpdateLostAndFoundInput {
    itemName?: string;
    type?: LostFoundType;
    location?: string;
    date?: Date;
    description?: string;
    tags?: string[];
}


export interface IGetLostAndFoundFilters {
    search?: string;
    type?: LostFoundType;
    location?: string;
    date?: string;
    page?: number;
    limit?: number;
}