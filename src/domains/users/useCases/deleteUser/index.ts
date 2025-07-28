import { PostgresUsersRepository } from '../../../../infra/repositories/PostgresUsersRepository';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const deleteUserByIdUseCase = new DeleteUserUseCase(postgresUsersRepository);

const deleteUserByIdController = new DeleteUserController(deleteUserByIdUseCase);

export { deleteUserByIdUseCase, deleteUserByIdController };
