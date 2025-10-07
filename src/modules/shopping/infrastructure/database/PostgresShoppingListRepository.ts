import { prisma } from 'core/database/prismaClient';
import { ShoppingList } from 'modules/shopping/domain/entities/ShoppingList';
import { ICreateListDTO, IShoppingList } from 'modules/shopping/domain/repositories/IShoppingList';
import crypto from 'crypto';

class PostgresShoppingListRespository implements IShoppingList {
  async create(data: ICreateListDTO): Promise<ShoppingList> {
    return await prisma.shoppingList.create({
      data: {
        userId: data.userId,
        name: data.name,
        id: crypto.randomUUID(),
      },
    });
  }
}

export { PostgresShoppingListRespository };
