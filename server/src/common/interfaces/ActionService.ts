export interface ActionService<T, P> {
    create?: (params : P)=> Promise<void>;
    updateById?: (id : number) => Promise<T>;
    deleteById?: (id : number) => Promise<void>;
}