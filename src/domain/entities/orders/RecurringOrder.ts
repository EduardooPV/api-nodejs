import { IExecutableOrder } from '../../interfaces/ExecutableOrder';

class RecurringOrder implements IExecutableOrder {
  execute(): string {
    return `Executando ordem recorrente`;
  }
}

export { RecurringOrder };
