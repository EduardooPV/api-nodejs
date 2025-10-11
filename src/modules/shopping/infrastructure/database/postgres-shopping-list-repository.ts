import { prisma } from 'core/database/prisma-client';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import crypto from 'crypto';
import { IShoppingList } from 'modules/shopping/domain/repositories/shopping-list-repository';
import { ICreateListDTO } from 'modules/shopping/application/create-list/create-list-dto';
import { IGetListDTO } from 'modules/shopping/application/get-list/get-list-dto';

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

  async getList(data: IGetListDTO): Promise<ShoppingList | null> {
    return await prisma.shoppingList.findUnique({
      where: {
        id: data.listId,
        userId: data.userId,
      },
    });
  }
}

export { PostgresShoppingListRespository };
