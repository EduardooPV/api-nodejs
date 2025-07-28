import { PostgresUsersRepository } from '../../../../infra/repositories/PostgresUsersRepository';
import { ListUsersController } from './ListUsersController';
import { ListUsersUseCase } from './ListUsersUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const listUsersUseCase = new ListUsersUseCase(postgresUsersRepository);

const listUsersController = new ListUsersController(listUsersUseCase);

export { listUsersUseCase, listUsersController };
