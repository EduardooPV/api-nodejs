import { ILogger } from '../interfaces/Logger';

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

export { ConsoleLogger };
