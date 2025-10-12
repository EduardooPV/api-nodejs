import { InvalidUserIdError } from 'modules/users/domain/errors/invalid-user-id-error';
import { InvalidListId } from 'modules/shopping/domain/errors/invalid-list-id';
import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';
import { IDeleteListByIdDTO } from './delete-list-by-id-dto';

class DeleteListByIdUseCase {
  constructor(private shoppingListRepository: PostgresShoppingListRespository) {}

  async execute(data: IDeleteListByIdDTO): Promise<void> {
    if (data.userId == null) throw new InvalidUserIdError({ reason: 'missing' });

    if (data.id === null) throw new InvalidListId();

    await this.shoppingListRepository.deleteListById(data);
  }
}

export { DeleteListByIdUseCase };
