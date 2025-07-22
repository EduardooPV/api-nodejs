import { IOrder } from '../interfaces/Order';
import { IOrderValidator } from '../interfaces/OrderValidator';

class OrderValidator implements IOrderValidator {
  isValid(order: IOrder): boolean {
    if (order.amount < 100) {
      return false;
    }

    return true;
  }
}

export { OrderValidator };
