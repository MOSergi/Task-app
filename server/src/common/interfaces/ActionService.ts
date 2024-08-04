export interface ActionService<T, C, U> {
    create?: (params : C)=> Promise<void>;
    updateById?: (id : number, params : U) => Promise<T>;
    deleteById?: (id : number) => Promise<void>;
}