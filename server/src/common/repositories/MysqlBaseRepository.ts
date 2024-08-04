import { Filterable, FindAttributeOptions, Includeable, Model, ModelStatic } from "sequelize";

export interface Conditions {
    selectColumns?: FindAttributeOptions,
    condition?: Filterable,
    includeModel?: Includeable,
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

export class MysqlBaseRepository<M extends ModelStatic<Model<any, any>>, T> {

    private model : M;

    constructor(model : M){
        this.model = model;
    }

    protected async findAll(params : Conditions) : Promise<Array<T>>{
        const findOptions = params.condition;

        const results = await this.model.findAll({
            attributes : params.selectColumns,
            ...findOptions,
            include : params.includeModel,
            order : params.order,
            limit : params.limit,
            offset : params.offset
        });

        const parsedResults = results.map((result)=>{
            return result.dataValues;
        })

        return parsedResults;
    }

    protected async findById(id : number) : Promise<T | null>{
        const result = await this.model.findOne({
            where : {
                id : id
            }
        });

        if (result){
            return result.dataValues;
        }

        return null;
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