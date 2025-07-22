import { IExecutableOrder } from '../../interfaces/ExecutableOrder';

class ScheduledOrder implements IExecutableOrder {
  execute(): string {
    return `Executando ordem para o futuro`;
  }
}

export { ScheduledOrder };
