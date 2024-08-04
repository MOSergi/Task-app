export interface GetTaskParams {
    userId : number,
    filters?: {
        title : string,
        description : string,
        completed : string
    },
    limit?: string,
    offset?: string
}