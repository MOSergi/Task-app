import { Model, ModelStatic } from "sequelize";
import { Where } from "sequelize/types/utils";

interface Conditions {
    condition?: Where,
    order?: string[],
    limit?: number,
    offset?: number
}

interface CreateParams {
    [key : string] : any
}

interface UpdateParams {
    [key : string] : any
}

export class MysqlBaseRepository<M extends ModelStatic<Model<any, any>>> {

    private model : M;

    constructor(model : M){
        this.model = model;
    }

    protected async findAll(params : Conditions) : Promise<Model<any, any>[]>{
        const results = await this.model.findAll(params)
        return results;
    }

    protected async findById(id : number) : Promise<Model<any, any> | null>{
        const result = await this.model.findOne({
            where : {
                id : id
            }
        });
        return result;
    }

    protected async create(params : CreateParams): Promise<void>{
        await this.model.create(params as any);
    }

    protected async update(id : number, params: UpdateParams) : Promise<void>{
        await this.model.update(params, {
            where : {
                id
            }
        });
    }

    protected async deleteById (id: number): Promise<void>{
        await this.model.destroy({
            where : {
                id
            }
        })
    };
}