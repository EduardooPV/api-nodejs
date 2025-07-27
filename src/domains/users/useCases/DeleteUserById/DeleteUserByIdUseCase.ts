import { UserNotFound } from '../../errors/UserNotFound';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IDeleteUserByIdRequestDTO } from './DeleteUserByIdDTO';

class DeleteUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IDeleteUserByIdRequestDTO): Promise<void> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new UserNotFound();
    }

    await this.userRepository.deleteById(data.id);
  }
}
export { DeleteUserByIdUseCase };
