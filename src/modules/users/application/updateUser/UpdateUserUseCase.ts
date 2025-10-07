import { InvalidUserIdError } from 'modules/users/domain/errors/InvalidUserIdError';
import { UserNotFound } from 'modules/users/domain/errors/UserNotFound';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
import { IUpdateUserParamsDTO, IUpdateUserRequestDTO } from './UpdateUserDTO';
import { UserAlreadyExistsError } from 'modules/users/domain/errors/UserAlreadyExistsError';

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
