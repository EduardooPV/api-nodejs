import { IOrder } from '../../interfaces/Order';

class ScheduledOrder implements IOrder {
  execute(): string {
    return `Executando ordem para o futuro`;
  }
}

export { ScheduledOrder };
