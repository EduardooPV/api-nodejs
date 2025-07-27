import { PostgresUsersRepository } from '../../../../infra/repositories/PostgresUsersRepository';
import { DeleteUserByIdController } from './DeleteUserByIdController';
import { DeleteUserByIdUseCase } from './DeleteUserByIdUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const deleteUserByIdUseCase = new DeleteUserByIdUseCase(postgresUsersRepository);

const deleteUserByIdController = new DeleteUserByIdController(deleteUserByIdUseCase);

export { deleteUserByIdUseCase, deleteUserByIdController };
