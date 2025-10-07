import { InvalidUserIdError } from 'modules/users/domain/errors/InvalidUserIdError';
import { UserNotFound } from 'modules/users/domain/errors/UserNotFound';
import { IUsersRepository } from 'modules/users/domain/repositories/IUserRepository';
import { IDeleteUserRequestDTO } from './DeleteUserDTO';

class DeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IDeleteUserRequestDTO): Promise<void> {
    if (data.id == null) throw new InvalidUserIdError({ reason: 'missing' });

    const user = await this.userRepository.findById(data.id);

    if (!user) throw new UserNotFound();

    await this.userRepository.deleteById(data.id);
  }
}
export { DeleteUserUseCase };
