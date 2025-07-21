import { IOrder } from '../../interfaces/Order';

class RecurringOrder implements IOrder {
  execute(): string {
    return `Executando ordem recorrente`;
  }
}

export { RecurringOrder };
