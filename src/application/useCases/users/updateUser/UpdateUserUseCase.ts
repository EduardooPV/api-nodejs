import { InvalidUserIdError } from '@domain/users/errors/InvalidUserIdError';
import { UserNotFound } from '@domain/users/errors/UserNotFound';
import { IUsersRepository } from '@domain/users/repositories/IUserRepository';
import { IUpdateUserParamsDTO, IUpdateUserRequestDTO } from './UpdateUserDTO';

class UpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(params: IUpdateUserParamsDTO, data: IUpdateUserRequestDTO): Promise<void> {
    if (params.id == null) throw new InvalidUserIdError({ reason: 'missing' });

    const userExist = await this.userRepository.findById(params.id);

    if (!userExist) throw new UserNotFound();

    await this.userRepository.updateById(params.id, data);
  }
}

export { UpdateUserUseCase };
