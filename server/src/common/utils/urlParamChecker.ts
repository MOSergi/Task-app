import { ExceptionThrower } from "./ExceptionThrower";

type availableDataTypesForCheck = "number" | "string"; 

export const urlParamChecker = (type : availableDataTypesForCheck, urlParam?: string)=>{

    if (type === "number"){
        const numberConversion = Number(urlParam);

        if (isNaN(numberConversion)){
            new ExceptionThrower({
                status : 400,
                message : 'Invalid URL param format'
            })
        }

        return numberConversion;
    }

    if (type === "string"){
        return urlParam;
    }

}