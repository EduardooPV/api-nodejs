import { ConsoleLogger } from './domain/entities/ConsoleLogger';
import { ConsoleNotifier } from './domain/entities/ConsoleNotifier';
import { OrderValidator } from './domain/entities/OrderValidator';
import { IOrder } from './domain/interfaces/Order';
import { OrderService } from './domain/service/OrderService';

const logger = new ConsoleLogger();
const notifier = new ConsoleNotifier();
const validator = new OrderValidator();

const orderService = new OrderService(logger, notifier, validator);

const fakeOrder: IOrder = {
  id: '321',
  userId: '123',
  amount: 30,
  execute: () => {
    console.log('Execução da ordem...');
  },
};

orderService.execute(fakeOrder);
