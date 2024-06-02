import { jest, describe, beforeEach, test, expect } from "@jest/globals"

import { UsersActionService } from "../../../modules/Users/services/users.action.service"
import { UsersRepository } from "../../../modules/Users/repositorie/users.repository";

describe('Users Action Service', () => {
    let usersActionService: UsersActionService;
    let usersRepository: jest.Mocked<UsersRepository>;

    beforeEach(() => {
        usersRepository = {
            createUser : jest.fn()
        } as any;

        usersActionService = new UsersActionService(usersRepository);
    });

    test('should create a user', async () => {
        const createUserParams = { 
        name : "test",
        email : "test@test.com",
        password : "Abc123.."
        };

        await usersActionService.create(createUserParams);
        
        expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    });
    //pending implement error cases
});