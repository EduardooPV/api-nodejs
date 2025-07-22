import { IOrder } from './Order';

interface IExecutableOrder {
  execute(order: IOrder): void;
}

export { IExecutableOrder };
