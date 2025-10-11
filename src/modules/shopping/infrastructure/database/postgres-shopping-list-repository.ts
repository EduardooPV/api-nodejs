import { prisma } from 'core/database/prisma-client';
import { ShoppingList } from 'modules/shopping/domain/entities/shopping-list';
import crypto from 'crypto';
import { IShoppingList } from 'modules/shopping/domain/repositories/shopping-list-repository';
import { ICreateListDTO } from 'modules/shopping/application/create-list/create-list-dto';
import { IGetAllListsRequestDTO } from 'modules/shopping/application/get-all-lists/get-all-lists-dto';

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

  async getAllLists(data: IGetAllListsRequestDTO): Promise<ShoppingList[]> {
    return await prisma.shoppingList.findMany({
      where: {
        userId: data.userId,
      },
    });
  }
}

export { PostgresShoppingListRespository };
