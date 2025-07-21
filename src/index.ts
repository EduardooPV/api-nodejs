import { ImmediateOrder } from './domain/entities/orders/ImmediateOrder';
import { RecurringOrder } from './domain/entities/orders/RecurringOrder';
import { ScheduledOrder } from './domain/entities/orders/ScheduledOrder';
import { IOrder } from './domain/interfaces/Order';

function processOrder(order: IOrder): string {
  return order.execute();
}

console.log(processOrder(new RecurringOrder()));

console.log(processOrder(new ScheduledOrder()));

console.log(processOrder(new ImmediateOrder()));
