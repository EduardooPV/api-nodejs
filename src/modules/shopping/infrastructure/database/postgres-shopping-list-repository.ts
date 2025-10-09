import { prisma } from 'core/database/prisma-client';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import crypto from 'crypto';
import {
  ICreateListDTO,
  IShoppingList,
} from 'modules/shopping/domain/repositories/shopping-list-repository';

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
