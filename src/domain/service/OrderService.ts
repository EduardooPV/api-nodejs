import { IOrderService } from '../interfaces/OrderService';
import { ILogger } from '../interfaces/Logger';
import { INotifier } from '../interfaces/Notifier';
import { IOrder } from '../interfaces/Order';
import { IOrderValidator } from '../interfaces/OrderValidator';

class OrderService implements IOrderService {
  constructor(
    private logger: ILogger,
    private notifier: INotifier,
    private validator: IOrderValidator,
  ) {}

  execute(order: IOrder): void {
    if (!this.validator.isValid(order)) {
      this.logger.log('Ordem inválida.');
      this.notifier.notify('123', 'Sua ordem foi rejeitada.');
      return;
    }

    this.logger.log('Ordem executada com sucesso.');
    this.notifier.notify(order.userId, 'Sua ordem foi executada!');
  }
}

export { OrderService };
