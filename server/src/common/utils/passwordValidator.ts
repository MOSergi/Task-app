import { ExceptionThrower } from "./ExceptionThrower"

export const passwordValidator = (password : string)=>{
    if (password.length < 8){
        new ExceptionThrower({
            status : 400,
            message : 'Password is to short'
        })
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

    if (!strongPasswordRegex.test(password)){
        new ExceptionThrower({
            status : 400,
            message : 'Password is to weak. Password must contain number, letters and Capital Letters'
        })
    }
}