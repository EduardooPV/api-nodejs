import { PostgresUsersRepository } from '../../../../infra/repositories/PostgresUsersRepository';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(postgresUsersRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
