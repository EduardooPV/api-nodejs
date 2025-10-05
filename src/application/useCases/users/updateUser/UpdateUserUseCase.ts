import { InvalidUserIdError } from '@domain/users/errors/InvalidUserIdError';
import { UserNotFound } from '@domain/users/errors/UserNotFound';
import { IUsersRepository } from '@domain/users/repositories/IUserRepository';
import { IUpdateUserParamsDTO, IUpdateUserRequestDTO } from './UpdateUserDTO';
import { UserAlreadyExistsError } from '../../../../domain/users/errors/UserAlreadyExistsError';

class UpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(params: IUpdateUserParamsDTO, data: IUpdateUserRequestDTO): Promise<void> {
    if (params.id == null) throw new InvalidUserIdError({ reason: 'missing' });

    const userExist = await this.userRepository.findById(params.id);

    if (!userExist) throw new UserNotFound();

    const emailAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (emailAlreadyExist && emailAlreadyExist.id !== params.id) {
      throw new UserAlreadyExistsError();
    }

    await this.userRepository.updateById(params.id, data);
  }
}

export { UpdateUserUseCase };
