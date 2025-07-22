import { IOrder } from './Order';

interface IOrderService {
  execute(order: IOrder): void;
}

export { IOrderService };
