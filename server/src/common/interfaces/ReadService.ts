export interface ReadService<T, P> {
    read?: (params : P) => Promise<Array<T>>;
    readById?: (id : number) => Promise<T>;
}