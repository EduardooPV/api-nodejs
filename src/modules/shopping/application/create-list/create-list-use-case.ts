import { ICreateListRequestDTO } from './create-list-dto';
import { InvalidName } from 'modules/shopping/domain/errors/invalid-name';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import { InvalidUserIdError } from 'modules/users/domain/errors/invalid-user-id-error';
import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/postgres-shopping-list-repository';

class CreateListUseCase {
  constructor(private shoppingListRepository: PostgresShoppingListRespository) {}

  async execute(data: ICreateListRequestDTO): Promise<ShoppingList> {
    if (data.userId == null) throw new InvalidUserIdError({ reason: 'missing' });

    if (!data.name || data.name.trim().length === 0) {
      throw new InvalidName({ reason: 'missing' });
    }

    return await this.shoppingListRepository.create({
      name: data.name.trim(),
      userId: data.userId,
    });
  }
}

export { CreateListUseCase };
