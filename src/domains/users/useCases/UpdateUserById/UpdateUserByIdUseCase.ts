import { UserNotFound } from '../../errors/UserNotFound';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IUpdateUserByIdParamsDTO, IUpdateUserByIdRequestDTO } from './UpdateUserByIdDTO';

class UpdateUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(params: IUpdateUserByIdParamsDTO, data: IUpdateUserByIdRequestDTO): Promise<void> {
    if (params.id == null) {
      throw new Error('User id is required');
    }

    const userExist = await this.userRepository.findById(params.id);

    if (!userExist) {
      throw new UserNotFound();
    }

    await this.userRepository.updateUserById(params.id, data);
  }
}

export { UpdateUserByIdUseCase };
