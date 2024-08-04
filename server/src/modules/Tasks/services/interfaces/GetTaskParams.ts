export interface GetTaskParams {
    userId : number,
    filters?: {
        title : string,
        description : string,
        completed : boolean
    },
    limit?: string,
    offset?: string
}