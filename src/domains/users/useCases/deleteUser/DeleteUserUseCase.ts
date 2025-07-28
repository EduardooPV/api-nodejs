import { UserNotFound } from '../../errors/UserNotFound';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IDeleteUserRequestDTO } from './DeleteUserDTO';

class DeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IDeleteUserRequestDTO): Promise<void> {
    if (data.id == null) {
      throw new Error('User id is required');
    }

    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new UserNotFound();
    }

    await this.userRepository.deleteById(data.id);
  }
}
export { DeleteUserUseCase };
