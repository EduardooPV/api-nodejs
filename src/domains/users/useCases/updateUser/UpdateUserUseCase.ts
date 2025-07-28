import { UserNotFound } from '../../errors/UserNotFound';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IUpdateUserParamsDTO, IUpdateUserRequestDTO } from './UpdateUserDTO';

class UpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(params: IUpdateUserParamsDTO, data: IUpdateUserRequestDTO): Promise<void> {
    if (params.id == null) {
      throw new Error('User id is required');
    }

    const userExist = await this.userRepository.findById(params.id);

    if (!userExist) {
      throw new UserNotFound();
    }

    await this.userRepository.updateById(params.id, data);
  }
}

export { UpdateUserUseCase };
