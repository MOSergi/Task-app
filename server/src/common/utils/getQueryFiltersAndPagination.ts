import { Request } from "express";

interface GetQueryFiltersAndPaginationInterface {
    filters?: {
        [key : string] : string
    } | any,
    limit?: string,
    offset?: string 
}

export const getQueryFiltersAndPagination = (request : Request) : GetQueryFiltersAndPaginationInterface =>{
    const filters = request.query.filters as any;
    const limit = request.query.limit as any;
    const offset = request.query.offset as any;

    return {
        filters,
        limit,
        offset
    }
}