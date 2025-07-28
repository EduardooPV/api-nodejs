import { PostgresUsersRepository } from '../../../../infra/repositories/PostgresUsersRepository';
import { UpdateUserByIdController } from './UpdateUserByIdController';
import { UpdateUserByIdUseCase } from './UpdateUserByIdUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const updateUserByIdUseCase = new UpdateUserByIdUseCase(postgresUsersRepository);

const updateUserByIdController = new UpdateUserByIdController(updateUserByIdUseCase);

export { updateUserByIdUseCase, updateUserByIdController };
