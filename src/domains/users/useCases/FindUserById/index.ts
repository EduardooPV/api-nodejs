import { PostgresUsersRepository } from '../../../../infra/repositories/PostgresUsersRepository';
import { FindUserByIdController } from './FindUserByIdController';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const findUserByIdUseCase = new FindUserByIdUseCase(postgresUsersRepository);

const findUserByIdController = new FindUserByIdController(findUserByIdUseCase);

export { findUserByIdUseCase, findUserByIdController };
