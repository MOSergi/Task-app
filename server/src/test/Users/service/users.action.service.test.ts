import { jest, describe, beforeEach, test, expect } from "@jest/globals"
import { UsersActionService } from "../../../modules/Users/services/users.action.service"
import { UsersRepository } from "../../../modules/Users/repository/users.repository";
import { UsersReadService } from "../../../modules/Users/services/users.read.service";

describe('Users Action Service', () => {
    let usersActionService: UsersActionService;
    let usersReadService : UsersReadService; 
    let usersRepository: jest.Mocked<UsersRepository>;

    beforeEach(() => {
        usersRepository = {
            createUser : jest.fn(),
            getUsers : jest.fn()
        } as any;

        usersReadService = new UsersReadService(usersRepository);
        usersActionService = new UsersActionService(usersRepository, usersReadService);
    });

    test('should create a user', async () => {
        const createUserParams = { 
            name : "test",
            email : "test@test.com",
            password : "Abc123.."
        };

        usersRepository.getUsers.mockResolvedValue([]);

        await usersActionService.create(createUserParams);
        
        expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    });
    test('should throw an error if email not match regex', async ()=>{
        const createUserParams = { 
            name : "test",
            email : "test@test",
            password : "testPassword"
        };

        try {
            await usersActionService.create(createUserParams)
        } catch (error){
            expect(error).toStrictEqual({
                status : 400,
                message : 'Invalid email'
            });
        }
    })
    test('Should thown an error if password is to short', async ()=>{
        const createUserParams = { 
            name : "test",
            email : "test@test.com",
            password : "TestPas"
        };

        try {
            await usersActionService.create(createUserParams)
        } catch (error){
            expect(error).toStrictEqual({
                status : 400,
                message : 'Password is to short'
            });
        }
    })
    test('Should throw an error if password is to weak', async() => {
        const createUserParams = { 
            name : "test",
            email : "test@test.com",
            password : "TestPass"
        };

        try {
            await usersActionService.create(createUserParams)
        } catch (error){
            expect(error).toStrictEqual({
                status : 400,
                message : 'Password is to weak. Password must contain number, letters and Capital Letters'
            });
        }
    })
    test('Should throw an error if email already exists', async ()=>{
        const createUserParams = { 
            name : "test",
            email : "test@test.com",
            password : "Abc123.."
        };

        usersRepository.getUsers.mockResolvedValue([
           'User' as any
        ]);

        try {
            await usersActionService.create(createUserParams)
        } catch (error){
            expect(error).toStrictEqual({
                status : 409,
                message : 'Invalid email. Try other'
            });
        }
    })
});