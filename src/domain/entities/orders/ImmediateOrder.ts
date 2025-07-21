import { IOrder } from '../../interfaces/Order';

class ImmediateOrder implements IOrder {
  execute(): string {
    return `Executando ordem imediata`;
  }
}

export { ImmediateOrder };
