import { ICreateListRequestDTO } from './CreateListDTO';
import { InvalidName } from 'modules/shopping/domain/errors/InvalidName';
import { ShoppingList } from 'modules/shopping/domain/entities/ShoppingList';
import { InvalidUserIdError } from 'modules/users/domain/errors/InvalidUserIdError';
import { PostgresShoppingListRespository } from 'modules/shopping/infrastructure/database/PostgresShoppingListRepository';

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
