export interface GetRideInput {
    from?: string;
    to?: string;
    date?: string;
    page: number;
    limit: number;
}