import { IExecutableOrder } from '../../interfaces/ExecutableOrder';

class ImmediateOrder implements IExecutableOrder {
  execute(): string {
    return `Executando ordem imediata`;
  }
}

export { ImmediateOrder };
