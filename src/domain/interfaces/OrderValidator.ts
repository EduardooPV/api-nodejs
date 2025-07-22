import { IOrder } from './Order';

interface IOrderValidator {
  isValid(order: IOrder): boolean;
}

export { IOrderValidator };
