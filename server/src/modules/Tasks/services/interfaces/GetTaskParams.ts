export interface GetTaskParams {
    filters?: {
        title : string,
        description : string,
        ownrerId : string,
        completed : boolean
    },
    limit?: number,
    offset?: number
}